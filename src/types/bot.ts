
export type BotReply = {
    keyword: string
    exclude?: string[]
    messages: string[]
}

export type ReplyBot = {
    username: string
    password: string
    consentDm?: {
        consentQuestion: string,
        consentAnswer: string,
    }
    did: string
    replies: BotReply[]
}
