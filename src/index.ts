import { bots } from './bot'
import { ReplyBotFarm } from './bot/replyBotFarm';

const run = async () => {
  await ReplyBotFarm.create(bots);

  console.log(
    `🤖 running feed generator`,
  )
}

run()