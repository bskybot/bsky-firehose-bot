"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bots = void 0;
const nameOfYourBot1 = {
    username: "YourBotUsername",
    password: "YourBotPassword",
    did: "did:plc:YourBotDid",
    replies: [
        {
            keyword: "keyword1",
            exclude: ["badword1", "badword2"],
            messages: ["reply1", "reply2", "reply3"]
        },
        {
            keyword: "keyword2",
            messages: ["reply"]
        },
    ]
};
const nameOfYourBot2 = {
    username: "YourBotUsername",
    password: "YourBotPassword",
    did: "did:plc:YourBotDid",
    consentDm: {
        consentQuestion: "Do you consent to my terms, answer with `Yes`.",
        consentAnswer: "Yes"
    },
    replies: [
        {
            keyword: "another keywords phrase",
            messages: ["reply1", "reply2", "reply3"]
        },
    ]
};
// get the did at https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${YOUR_HANDLE}
exports.bots = [nameOfYourBot1, nameOfYourBot2];
