import { bots } from './bot'
import { BotFarm } from './bot/botFarm';
import { Logger } from './util/logger';

/**
 * Asynchronously initializes a bot farm from the provided `bots` configuration and logs a message indicating that the bot farm is running.
 */
const run = async () => {
  await BotFarm.create(bots);
  Logger.info(`🤖 bot 🤖 farm 🤖 running 🤖`);
}

// Entry point for starting the bot farm
run();