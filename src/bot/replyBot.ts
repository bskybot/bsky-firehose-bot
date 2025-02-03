import AtpAgent, { AtpAgentOptions } from '@atproto/api';
import { ReplyBot } from '../types/bot';
import type { Post } from "../types/post";
import { buildReplyToPost, filterBotReplies } from '../util/botFunctions';
import { Logger } from '../util/logger';

/**
 * A specialized agent class extending `BskyAgent` that can "like" and reply to
 * posts under certain conditions. It uses a `ReplyBot` configuration to determine
 * how to respond.
 */
export class ReplyBotAgent extends AtpAgent {

    /**
     * Creates a new instance of ReplyBotAgent.
     * 
     * @param opts - Options for the ATP agent.
     * @param bot - A `ReplyBot` instance containing the username, password, DID, and reply patterns.
     */
    constructor(public opts: AtpAgentOptions, public bot: ReplyBot) {
        super(opts);
    }

    /**
     * Likes a post and replies to it if:
     * 1. The post is not from the bot itself.
     * 2. A suitable reply configuration exists for the post text.
     * 3. The author of the post is followed by the bot.
     * 
     * If these conditions are met, this method:
     * - Selects a random reply from the bot's configured replies.
     * - Likes the post and sends the chosen reply.
     * 
     * @param post - The `FeedEntry` representing the post to analyze and potentially respond to.
     * @returns A promise that resolves once the like and (if applicable) the reply have been sent.
     */
    async likeAndReplyIfFollower(post: Post): Promise<void> {
        if (post.authorDid === this.bot.did) {
            return;
        }

        const replies = filterBotReplies(post.text, this.bot.replies);
        if (replies.length < 1) {
            return;
        }

        try {
            const relations = await this.app.bsky.graph.getRelationships({ actor: this.bot.did, others: [post.authorDid] });
            if (!relations.data.relationships[0].followedBy) {
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
        } catch (error) {
            Logger.error("Error while replying:", `${error}, ${this.bot.username}`);
        }
    }
}

/**
 * Initializes a `ReplyBotAgent` for a given `ReplyBot` instance.
 * 
 * It attempts to log in using the credentials provided in the `bot`. If successful,
 * it returns the agent instance; otherwise, it returns `null`.
 * 
 * @param bot - The `ReplyBot` with the required credentials (username, password, DID).
 * @returns A promise that resolves to a `ReplyBotAgent` instance if login is successful,
 *          or `null` otherwise.
 */
export const useReplyBotAgent = async (bot: ReplyBot): Promise<ReplyBotAgent | null> => {
    const agent = new ReplyBotAgent({ service: 'https://bsky.social' }, bot);

    try {
        const login = await agent.login({ identifier: bot.username, password: bot.password! });

        if (!login.success) { 
            return null;
        }

        return agent;
    } catch (error) {
        Logger.error("Failed to initialize bot:", `${error}, ${bot.username}`);
        return null;
    }
};