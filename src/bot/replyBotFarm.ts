import { JetstreamSubscription } from "../feed/jetstream";
import { ReplyBot } from "../types/bot"
import { ReplyBotAgent, useReplyBotAgent } from "./replyBot"

export class ReplyBotFarm {   

    constructor(
        public botAgents: ReplyBotAgent[],
        
    ){
        this.botAgents = botAgents;
    }

    static async create(bots: ReplyBot[]) {
        const agents = (
            await Promise.all(
                bots.map(async (bot) => {
                    try {
                        return await useReplyBotAgent(bot as ReplyBot);
                    } catch (error) {
                        console.error(`Error creating agent for bot ${bot.username}:`, error);
                        return null; // Fehlerhafte Agenten ausschließen
                    }
                })
            )
        ).filter((agent): agent is ReplyBotAgent => agent !== null); // Nur gültige Agenten behalten
    
        return new ReplyBotFarm(agents);
    }
}