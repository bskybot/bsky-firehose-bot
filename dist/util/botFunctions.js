"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildReplyToPost = buildReplyToPost;
exports.websocketToFeedEntry = websocketToFeedEntry;
function buildReplyToPost(root, parent, message) {
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
function websocketToFeedEntry(data) {
    var _a, _b, _c, _d;
    const message = data;
    if (message.commit.operation != "create") {
        return null;
    }
    const messageUri = `at://${message.did}/${message.commit.record['$type']}/${message.commit.rkey}`;
    return {
        cid: message.commit.cid,
        uri: messageUri,
        authorDid: message.did,
        text: message.commit.record.text,
        rootCid: (_b = (_a = message.commit.record.reply) === null || _a === void 0 ? void 0 : _a.root.cid) !== null && _b !== void 0 ? _b : message.commit.cid,
        rootUri: (_d = (_c = message.commit.record.reply) === null || _c === void 0 ? void 0 : _c.root.uri) !== null && _d !== void 0 ? _d : messageUri,
    };
}
