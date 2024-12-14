import WebSocket from 'ws';
import { Post, UriCid } from "../types/post";
import { WebsocketMessage } from "../types/message";
import { BotReply } from '../types/bot';

/**
 * Constructs a reply object suitable for posting in the BlueSky feed.
 * 
 * This function creates a reply that references both a root post and a parent post.
 * It returns a payload that can be used with the posting API to create a reply.
 * 
 * @param root - An object containing the URI and CID of the root post.
 * @param parent - An object containing the URI and CID of the parent post that the reply is responding to.
 * @param message - The text content of the reply.
 * @returns An object representing the reply, including type, text, timestamp, and reply references.
 */
export function buildReplyToPost (root: UriCid, parent: UriCid, message: string) {    
    return {
        "$type": "app.bsky.feed.post",
        text: message,
        createdAt: new Date().toISOString(),
        reply: {
            "root": root,
            "parent": parent
        }
    };
}

/**
 * Converts a raw WebSocket message into a `FeedEntry` object, if possible.
 * 
 * This function checks if the incoming WebSocket data is structured like a feed commit message
 * with the required properties for a created post. If the data matches the expected shape,
 * it extracts and returns a `FeedEntry` object. Otherwise, it returns `null`.
 * 
 * @param data - The raw WebSocket data.
 * @returns A `FeedEntry` object if the data represents a newly created post, otherwise `null`.
 */
export function websocketToFeedEntry(data: WebSocket.Data): Post | null {
    const message = data as WebsocketMessage;
    if(!message.commit || !message.commit.record || !message.commit.record['$type'] || !message.did || !message.commit.cid || !message.commit.rkey || message.commit.operation !== "create") {
        return null;
    }
    const messageUri = `at://${message.did}/${message.commit.record['$type']}/${message.commit.rkey}`;
    return {
        cid: message.commit.cid,
        uri: messageUri,
        authorDid: message.did,
        text: message.commit.record.text,
        rootCid: message.commit.record.reply?.root.cid ?? message.commit.cid,
        rootUri: message.commit.record.reply?.root.uri ?? messageUri,
    };
}

/**
 * Filters a list of possible bot replies to find those that match the given text.
 * 
 * This function searches through the array of `BotReply` objects and returns those
 * whose `keyword` is present in the provided text. It also checks for any `exclude` 
 * words specified in the reply configuration and rejects those replies if any 
 * excluded words are present in the text.
 * 
 * @param text - The text to analyze for keywords.
 * @param botReplies - An array of `BotReply` objects to filter.
 * @returns An array of `BotReply` objects that match the given text criteria.
 */
export function filterBotReplies(text: string, botReplies: BotReply[]) {
    return botReplies.filter(reply => {
        const keyword = reply.keyword.toLowerCase();
        const keywordFound = text.toLowerCase().includes(keyword);
        if (!keywordFound) {
            return false;
        }

        if (Array.isArray(reply.exclude) && reply.exclude.length > 0) {
            for (const excludeWord of reply.exclude) {
                if (text.toLowerCase().includes(excludeWord.toLowerCase())) {
                    return false;
                }
            }
        }

        return true;
    });
}