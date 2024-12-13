import WebSocket from 'ws';
import { FeedEntry, UriCid } from "../types/feed";
import { WebsocketMessage } from "../types/message";
import { BotReply } from '../types/bot';

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
    if(!message.commit || !message.commit.record || !message.commit.record['$type'] || !message.did || !message.commit.cid || !message.commit.rkey || message.commit.operation != "create") {
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

export function filterBotReplies(text: string, botReplies: BotReply[]) {  
    return botReplies.filter(reply => {
      const keyword = reply.keyword.toLowerCase();
      const keywordFound = text.toLowerCase().includes(keyword);
      if (!keywordFound) {
        return false;
      }
  
      // Wenn es ein exclude-Array gibt, sicherstellen, 
      // dass keines der Wörter in exclude im Text vorkommt.
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