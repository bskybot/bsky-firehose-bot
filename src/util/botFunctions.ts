import WebSocket from 'ws';
import { FeedEntry, UriCid } from "../types/feed";
import { WebsocketMessage } from "../types/message";

export function buildReplyToPost (root: UriCid, parent: UriCid, message: string) {    
    return {
        "$type": "app.bsky.feed.post",
        text: message,
        createdAt: new Date().toISOString(),
        reply: {
            "root": root,
            "parent": parent
        }
    }
}

export function websocketToFeedEntry(data: WebSocket.Data): FeedEntry | null {
    const message = data as WebsocketMessage;
    if(message.commit.operation != "create") {
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
    } 
}