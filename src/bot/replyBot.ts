import { AtpAgentOpts, BskyAgent } from '@atproto/api';
import { ReplyBot } from '../types/bot';
import type { FeedEntry } from "../types/feed";
import { buildReplyToPost, filterBotReplies } from '../util/botFunctions';
import DatabaseHandler from '../util/databaseHandler';
import type { ConvoView } from '@atproto/api/dist/client/types/chat/bsky/convo/defs';
import { Logger } from '../util/logger';

export class ReplyBotAgent extends BskyAgent {
    private database: DatabaseHandler | null = null;

    constructor(public opts: AtpAgentOpts, public bot: ReplyBot) {
        super(opts);
    }

    // Initialisiert die Datenbankverbindung
    public async initDatabase(): Promise<void> {
        if (!this.database) {
            const dbName = 'bot_consent.db';
            await DatabaseHandler.createDatabase(dbName);
            this.database = new DatabaseHandler(dbName);
            await this.database.connect();
            await this.database.createTable(this.bot.username);
        }
    }

    async handleConsent(did: string): Promise<void> {
        await this.database!.deleteNoFollower(this.bot.username, did);
        await this.database!.addRow(this.bot.username, did);

        try {
            const convoData = await this.getOrCreateConvo(did);
            if (!convoData) {
                return;
            }

            const convo = convoData.convo;

            if(!await this.database?.hasDmSent(this.bot.username, did)) {
                const dmSent = await this.sendMessage(convo.id, this.bot.consentDm!.consentQuestion);
                if (!dmSent?.error) {
                    await this.database!.updateDmSentDate(this.bot.username, did);
                    Logger.info(`Consent DM sent to: ${did}`);
                }
            } else if(convo.lastMessage?.text === this.bot.consentDm?.consentAnswer) {
                await this.database?.updateConsentDate(this.bot.username, did);
            }
        } catch (error) {
            Logger.error(`Failed to send DM to ${did}:`, `${error}, ${this.bot.username}`);
        }
    };

    private async getOrCreateConvo(did: string): Promise<{convo: ConvoView} | null> {
        const response = await fetch(`https://api.bsky.chat/xrpc/chat.bsky.convo.getConvoForMembers?members=${this.bot.did}&members=${did}`, {
            headers: { Authorization: `Bearer ${this.session?.accessJwt}` },
        });

        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    private async sendMessage(convoId: string, text: string): Promise<any> {
        const response = await fetch("https://api.bsky.chat/xrpc/chat.bsky.convo.sendMessage", {
            method: "POST",
            headers: { "Authorization": `Bearer ${this.session?.accessJwt}`, "Content-Type": "application/json"},
            body: JSON.stringify({ convoId, message: { text } }),
        });
        return await response.json();
    }

    async likeAndReplyIfFollower(post: FeedEntry): Promise<void> {
        if(post.authorDid === this.bot.did) {
            return;
        }

        const replies = filterBotReplies(post.text, this.bot.replies);
        if (replies.length < 1) {
            return;
        }

        const relations = await this.app.bsky.graph.getRelationships({actor: this.bot.did, others: [post.authorDid]});

        if(!relations.data.relationships[0].followedBy) {
            return;
        }

        if (this.bot.consentDm && !await this.database?.hasConsentDate(this.bot.username, post.authorDid)) {
            Logger.info(`No consent given yet from: ${post.authorDid}`, this.bot.username);
            this.handleConsent(post.authorDid);
            return;
        }

        const replyCfg = replies[Math.floor(Math.random() * replies.length)];
        const message = replyCfg.messages[Math.floor(Math.random() * replyCfg.messages.length)];
        const reply = buildReplyToPost(
            { uri: post.rootUri, cid: post.rootCid },
            { uri: post.uri, cid: post.cid },
            message
        );

        await Promise.all([this.like(post.uri, post.cid), this.post(reply)]);
        Logger.info(`Replied to post: ${post.uri}`, this.bot.username);
    }
}

export const useReplyBotAgent = async (bot: ReplyBot, interval = 45000): Promise<ReplyBotAgent | null> => {
    const agent = new ReplyBotAgent({ service: 'https://bsky.social' }, bot);

    try {
        const login = await agent.login({ identifier: bot.username, password: bot.password! });
        if (!login.success){ 
            return null;
        }

        if (bot.consentDm) {
            await agent.initDatabase();
        }

        return agent;
    } catch (error) {
        Logger.error("Failed to initialize bot:", `${error}, ${bot.username}`);
        return null;
    }
};
