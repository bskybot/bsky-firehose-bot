import { JetstreamSubscription } from "../feed/jetstream";
import { ConsentBot, ReplyBot } from "../types/bot"
import { websocketToFeedEntry } from "../util/botFunctions";
import { Logger } from "../util/logger";
import { isNotNull } from "../util/typefunction";
import { ConsentBotAgent, useConsentBotAgent } from "./consentBot";
import { ReplyBotAgent, useReplyBotAgent } from "./replyBot"

/**
 * Represents a collection of bot agents (either `ReplyBotAgent` or `ConsentBotAgent`) 
 * and a jetstream subscription that listens to feed events and triggers bot actions.
 */
export class BotFarm {   
    /**
     * Creates a new instance of `BotFarm`.
     * 
     * @param botAgents - An array of initialized bot agents (`ReplyBotAgent` or `ConsentBotAgent`).
     * @param jetstream - An instance of `JetstreamSubscription` that provides a stream of feed entries.
     */
    constructor(
        public botAgents: Array<ReplyBotAgent | ConsentBotAgent>,
        public jetstream: JetstreamSubscription,
    ){
        this.botAgents = botAgents;
        this.jetstream = jetstream;
    }

    /**
     * Asynchronously creates a `BotFarm` by initializing multiple bot agents from a list of `ReplyBot` or `ConsentBot` configurations.
     * 
     * This method:
     * - Attempts to initialize agents for each provided bot.
     *   - If a bot has `consentDm` property, a `ConsentBotAgent` is created.
     *   - Otherwise, a `ReplyBotAgent` is created.
     * - Filters out any agents that fail to initialize.
     * - Sets up a `JetstreamSubscription` that listens for new feed events.
     *   Whenever a new feed entry is received, each agent will attempt to like and reply if conditions are met.
     * 
     * @param bots - An array of bots (either `ReplyBot` or `ConsentBot`) to create agents for.
     * @returns A promise that resolves to a new instance of `BotFarm` containing all successfully initialized agents.
     */
    static async create(bots: Array<ReplyBot | ConsentBot>) {
        const agents = (
            await Promise.all(
                bots.map(async (bot) => {
                    try {
                        if ("consentDm" in bot) {
                            return await useConsentBotAgent(bot);
                        } else {
                            return await useReplyBotAgent(bot);
                        }
                    } catch (error) {
                        Logger.error(`Error creating agent for bot ${bot.username}:`, error);
                        return null; // Exclude agents that failed to initialize
                    }
                })
            )
        ).filter(isNotNull); // Keep only valid agents

        const jetstream = new JetstreamSubscription(
            `wss://jetstream1.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post`,
            3000,
            async (data) => {
                const feedEntry = websocketToFeedEntry(JSON.parse(data));
                if (feedEntry) {
                    agents.forEach((agent) => agent.likeAndReplyIfFollower(feedEntry));
                }
            }
        );
    
        return new BotFarm(agents, jetstream);
    }
}