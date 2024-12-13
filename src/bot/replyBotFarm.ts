import { JetstreamSubscription } from "../feed/jetstream";
import { ReplyBot } from "../types/bot"
import { websocketToFeedEntry } from "../util/botFunctions";
import { Logger } from "../util/logger";
import { ReplyBotAgent, useReplyBotAgent } from "./replyBot"

export class ReplyBotFarm {   
    constructor(
        public botAgents: ReplyBotAgent[],
        public jetstream: JetstreamSubscription,
    ){
        this.botAgents = botAgents;
        this.jetstream = jetstream;
    }

    static async create(bots: ReplyBot[]) {
        const agents = (
            await Promise.all(
                bots.map(async (bot) => {
                    try {
                        return await useReplyBotAgent(bot as ReplyBot);
                    } catch (error) {
                        Logger.error(`Error creating agent for bot ${bot.username}:`, error);
                        return null; // Fehlerhafte Agenten ausschließen
                    }
                })
            )
        ).filter((agent): agent is ReplyBotAgent => agent !== null); // Nur gültige Agenten behalten

        const jetstream = new JetstreamSubscription(
            `wss://jetstream1.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post`,
            3000,
            async (data) => {
                const feedEntry = websocketToFeedEntry(JSON.parse(data));
                if(feedEntry){
                    agents.forEach((agent) => agent.likeAndReplyIfFollower(feedEntry));
                }
            }
        );
    
        return new ReplyBotFarm(agents, jetstream);
    }
}