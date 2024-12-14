import { AtpAgentOpts, BskyAgent } from '@atproto/api';
import { ConsentBot } from '../types/bot';
import type { Post } from "../types/post";
import { buildReplyToPost, filterBotReplies } from '../util/botFunctions';
import DatabaseHandler from '../util/databaseHandler';
import type { ConvoView } from '@atproto/api/dist/client/types/chat/bsky/convo/defs';
import { Logger } from '../util/logger';

/**
 * A specialized agent class extending `BskyAgent` that implements consent-related features.
 * This agent can handle the process of requesting and verifying consent before replying to posts.
 * It also integrates a database layer to track consent and ensure that the bot only interacts
 * with users who have granted consent.
 */
export class ConsentBotAgent extends BskyAgent {
    private database: DatabaseHandler | null = null;

    /**
     * Creates a new instance of `ConsentBotAgent`.
     *
     * @param opts - Options for the ATP agent.
     * @param bot - A `ConsentBot` instance containing the bot's credentials, DID, and consent configuration.
     */
    constructor(public opts: AtpAgentOpts, public bot: ConsentBot) {
        super(opts);
    }

    /**
     * Initializes the database connection for consent tracking.
     * 
     * If the database is not already initialized, this method creates and connects to a SQLite database,
     * and ensures the required table (named after the bot's username) exists.
     * 
     * @returns A promise that resolves once the database is fully initialized.
     */
    public async initDatabase(): Promise<void> {
        if (!this.database) {
            const dbName = 'bot_consent.db';
            await DatabaseHandler.createDatabase(dbName);
            this.database = new DatabaseHandler(dbName);
            await this.database.connect();
            await this.database.createTable(this.bot.username);
        }
    }

    /**
     * Handles the consent process for a batch of DIDs (user IDs).
     * 
     * For each user:
     * - Removes any stale entries from the database if the user is no longer a follower.
     * - Adds or updates entries for current followers without recorded consent.
     * - Sends or has sent consent request DMs (if not already sent).
     * - Updates the database when a user grants consent.
     * 
     * @param dids - An array of user DIDs representing current followers.
     * @returns A promise that resolves once all consent-related updates are processed.
     */
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

                // If no DM has been sent yet, send one.
                if (!await this.database?.hasDmSent(this.bot.username, did)) {
                    const dmSent = await this.sendMessage(convo.id, this.bot.consentDm!.consentQuestion);
                    if (!dmSent?.error) {
                        await this.database!.updateDmSentDate(this.bot.username, did);
                        Logger.info(`Consent DM sent to: ${did}`);
                    }
                // If the user has replied with the consent answer, update the consent date.
                } else if (convo.lastMessage?.text === this.bot.consentDm?.consentAnswer) {
                    await this.database?.updateConsentDate(this.bot.username, did);
                }
            } catch (error) {
                Logger.error(`Failed to send DM to ${did}:`, error);
            }
        });

        await Promise.all(tasks);
    }

    /**
     * Fetches or creates a conversation (convo) object for the given DID.
     * 
     * This uses the BlueSky Chat API to fetch a conversation that includes the bot and the specified DID.
     * If the request is successful, returns the JSON object representing the convo.
     * Otherwise, returns null.
     * 
     * @param did - The DID of the user to get or create a conversation with.
     * @returns A promise that resolves to the convo data or null if not found.
     */
    private async getOrCreateConvo(did: string): Promise<{convo: ConvoView} | null> {
        const response = await fetch(
            `https://api.bsky.chat/xrpc/chat.bsky.convo.getConvoForMembers?members=${this.bot.did}&members=${did}`, 
            { headers: { Authorization: `Bearer ${this.session?.accessJwt}` } }
        );

        if (!response.ok) {
            return null;
        }
        return await response.json();
    }

    /**
     * Sends a message to a specific conversation.
     * 
     * @param convoId - The ID of the conversation to send a message to.
     * @param text - The text content of the message.
     * @returns A promise that resolves to the response data from the messaging API.
     */
    private async sendMessage(convoId: string, text: string): Promise<any> {
        const response = await fetch("https://api.bsky.chat/xrpc/chat.bsky.convo.sendMessage", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${this.session?.accessJwt}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ convoId, message: { text } }),
        });
        return await response.json();
    }

    /**
     * Checks whether a given post author is followed by the bot and has given consent.
     * If so, it will like and reply to the post using one of the bot's reply configurations.
     * 
     * The process is:
     * 1. If the post is by the bot itself, do nothing.
     * 2. Determine if any of the bot's configured replies match the post text.
     * 3. Check if the author is followed by the bot.
     * 4. Check if the author has granted consent.
     * 5. If all conditions are met, "like" the post and reply with a random selected message.
     * 
     * @param post - The post to potentially interact with.
     * @returns A promise that resolves once the like and reply actions are completed.
     */
    async likeAndReplyIfFollower(post: Post): Promise<void> {
        if (post.authorDid === this.bot.did) {
            return;
        }

        const replies = filterBotReplies(post.text, this.bot.replies);
        if (replies.length < 1) {
            return;
        }

        const relations = await this.app.bsky.graph.getRelationships({actor: this.bot.did, others: [post.authorDid]});

        if (!relations.data.relationships[0].followedBy) {
            return;
        }

        // Ensure that the author has granted consent.
        if (!await this.database?.hasConsentDate(this.bot.username, post.authorDid)) {
            Logger.info(`No consent given yet from: ${post.authorDid}`, this.bot.username);
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

    /**
     * Fetches all followers of the bot from the network.
     * 
     * It uses pagination to retrieve the full follower list and returns an array of their DIDs.
     * If the request fails, logs a warning and returns null.
     * 
     * @returns A promise that resolves to an array of follower DIDs or null on failure.
     */
    async getAllFollowers(): Promise<string[] | null> {
        try {
            const followers: string[] = [];
            let cursor: string | undefined;

            do {
                const response = await this.app.bsky.graph.getFollowers({ actor: this.bot.did, cursor });
                followers.push(...response.data.followers.map(f => f.did));
                cursor = response.data.cursor;
            } while (cursor);

            return followers;
        } catch (error) {
            Logger.warn(`Failed to fetch followers:`, error);
            return null;
        }
    }
}

/**
 * Initializes a `ConsentBotAgent` for a given `ConsentBot`.
 * 
 * This function attempts to log in using the bot's credentials. If login is successful and the bot requires consent handling,
 * it initializes the database and sets up an interval to periodically handle consent for all followers.
 * 
 * @param bot - The `ConsentBot` instance containing credentials, DID, and consent configuration.
 * @param interval - The interval (in milliseconds) to periodically re-check and handle consent. Defaults to 60,000 ms.
 * @returns A promise that resolves to a `ConsentBotAgent` instance if successful, otherwise `null`.
 */
export const useConsentBotAgent = async (bot: ConsentBot, interval = 60000): Promise<ConsentBotAgent | null> => {
    const agent = new ConsentBotAgent({ service: 'https://bsky.social' }, bot);

    try {
        const login = await agent.login({ identifier: bot.username, password: bot.password! });
        if (!login.success){ 
            return null;
        }

        if (bot.consentDm) {
            await agent.initDatabase();

            setInterval(async () => {
                const followers = await agent.getAllFollowers();
                if (!followers) {
                    return;
                }
                await agent.handleConsent(followers);
            }, interval);
        }

        return agent;
    } catch (error) {
        Logger.error("Failed to initialize bot:", `${error}, ${bot.username}`);
        return null;
    }
};