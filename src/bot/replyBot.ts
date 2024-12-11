import { AtpAgentOpts, BskyAgent } from '@atproto/api';
import { ReplyBot } from '../types/bot';
import type { FeedEntry } from "../types/feed";
import { buildReplyToPost, websocketToFeedEntry } from '../util/botFunctions';
import { JetstreamSubscription } from '../feed/jetstream';
import DatabaseHandler from '../util/databaseHandler';
import type { ConvoView } from '@atproto/api/dist/client/types/chat/bsky/convo/defs';
import { Logger } from '../util/logger';

export class ReplyBotAgent extends BskyAgent {
    private jetstream: JetstreamSubscription | null = null;
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

    async getAllFollowers(retries = 3): Promise<string[] | null> {
        let attempts = 0;
        while (attempts < retries) {
            try {
                const followers: string[] = [];
                let cursor: string | undefined;
    
                do {
                    const response = await this.app.bsky.graph.getFollowers({ actor: this.bot.did, cursor });
                    followers.push(...response.data.followers.map(f => f.did));
                    cursor = response.data.cursor;
                } while (cursor);
    
                return followers; // Erfolgreich
            } catch (error) {
                attempts++;
                Logger.warn(`Attempt ${attempts} failed to fetch followers:`, error);
                if (attempts >= retries) {
                    Logger.error("Failed to fetch followers after multiple attempts.");
                    return null;
                }
            }
        }
        return null;
    }

    private async initializeJetstream(dids: string[]): Promise<void> {
        this.jetstream = new JetstreamSubscription(
            `wss://jetstream1.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post&wantedDids=${dids.join('&wantedDids=')}`,
            3000,
            async (data) => {
                const feedEntry = websocketToFeedEntry(JSON.parse(data));
                if(feedEntry){
                    await this.likeAndReplyIfFollower(feedEntry);
                }
            }
        );
    }

    async updateJetstream(dids: string[]): Promise<void> {
        if (!dids.length) {
            Logger.warn("No DIDs provided for Jetstream.");
            if(this.jetstream) {
                this.jetstream.close(true);
                this.jetstream = null;
            }
            return;
        }

        if (!this.jetstream) {
            await this.initializeJetstream(dids);
        } else {
            this.jetstream.send(JSON.stringify({
                type: "options_update",
                payload: { 
                    wantedCollections: ["app.bsky.feed.post"], 
                    wantedDids: dids 
                },
            }));
            Logger.info(`Jetstream updated for bot: ${this.bot.username}`);
        }
    }

    async handleConsent(dids: string[]): Promise<void> {
        await this.database!.deleteNoFollower(this.bot.username, dids);
        if (!dids.length) {
            return;
        }
        await this.database!.addRows(this.bot.username, dids);

        const tasks = dids.map(async (did) => {
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
                Logger.error(`Failed to send DM to ${did}:`, error);
            }
        });

        await Promise.all(tasks);
    }

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
        if (this.bot.consentDm && !await this.database?.hasConsentDate(this.bot.username, post.authorDid)) {
            return;
        }

        const replyCfg = this.bot.replies.find(cfg => post.text.includes(cfg.keyword) && !cfg.exclude?.some(ex => post.text.includes(ex)));
        if (!replyCfg) {
            return;
        }

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
        setInterval(async () => {
            const followers = await agent.getAllFollowers();
            if (!followers) {
                Logger.warn("Unable to fetch followers. Skipping this iteration.");
                return;
            }
        
            if (bot.consentDm) {
                await agent.handleConsent(followers);
            }
            await agent.updateJetstream(followers);
        }, interval);

        return agent;
    } catch (error) {
        Logger.error("Failed to initialize bot:", error);
        return null;
    }
};
