
import { DidResolver } from '@atproto/identity'
import { ReplyBot } from './bot'

export type AppContext = {
  didResolver: DidResolver
  cfg: Config
}

export type Config = {
  subscriptionEndpoint: string
  subscriptionReconnectDelay: number
  bots: ReplyBot[]
}
