/**
 * Represents a configuration for a reply that a bot can use.
 * 
 * - `keyword`: The main word or phrase to look for in the post text.
 * - `exclude`: An optional array of words or phrases; if any are present in the post text, this reply should not be used.
 * - `messages`: An array of possible messages the bot can use as a reply.
 */
export type BotReply = {
    keyword: string;
    exclude?: string[];
    messages: string[];
}

/**
 * Represents a basic replying bot's configuration.
 * 
 * - `username`: The bot's username credential.
 * - `password`: The bot's password credential.
 * - `did`: The bot's Decentralized Identifier (DID).
 * - `replies`: An array of `BotReply` objects to determine how the bot responds to certain keywords.
 */
export type ReplyBot = {
    username: string;
    password: string;
    did: string;
    replies: BotReply[];
}

/**
 * A specialized version of a `ReplyBot` that includes consent-related messages.
 * 
 * - `consentDm`: An object containing:
 *   - `consentQuestion`: The question message sent to request consent.
 *   - `consentAnswer`: The expected reply message indicating that consent has been granted.
 */
export type ConsentBot = ReplyBot & {
    consentDm: {
        consentQuestion: string;
        consentAnswer: string;
    };
}