import { bots } from './bot'
import { ReplyBotFarm } from './bot/replyBotFarm';
import { Logger } from './util/logger';

const run = async () => {
  await ReplyBotFarm.create(bots);

  Logger.info(
    `🤖 running feed generator`,
  )
}

run()