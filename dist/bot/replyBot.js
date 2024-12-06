"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReplyBotAgent = exports.ReplyBotAgent = void 0;
const api_1 = require("@atproto/api");
const botFunctions_1 = require("../util/botFunctions");
const jetstream_1 = require("../feed/jetstream");
const databaseHandler_1 = __importDefault(require("../util/databaseHandler"));
class ReplyBotAgent extends api_1.BskyAgent {
    constructor(opts, bot) {
        super(opts);
        this.opts = opts;
        this.bot = bot;
        this.jetstream = null;
        this.database = null;
    }
    // Initialisiert die Datenbankverbindung
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.database) {
                const dbName = 'bot_consent.db';
                yield databaseHandler_1.default.createDatabase(dbName);
                this.database = new databaseHandler_1.default(dbName);
                yield this.database.connect();
                yield this.database.createTable(this.bot.username);
            }
        });
    }
    getAllFollowers() {
        return __awaiter(this, void 0, void 0, function* () {
            const followers = [];
            let cursor;
            try {
                do {
                    const response = yield this.app.bsky.graph.getFollowers({ actor: this.bot.did, cursor });
                    followers.push(...response.data.followers.map(f => f.did));
                    cursor = response.data.cursor;
                } while (cursor);
            }
            catch (error) {
                console.error("Error while fetching followers:", error);
            }
            return followers;
        });
    }
    initializeJetstream(dids) {
        return __awaiter(this, void 0, void 0, function* () {
            this.jetstream = new jetstream_1.JetstreamSubscription(`wss://jetstream1.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post&wantedDids=${dids.join('&wantedDids=')}`, 3000, (data) => __awaiter(this, void 0, void 0, function* () {
                const feedEntry = (0, botFunctions_1.websocketToFeedEntry)(JSON.parse(data));
                if (feedEntry) {
                    yield this.likeAndReplyIfFollower(feedEntry);
                }
            }));
        });
    }
    updateJetstream(dids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dids.length) {
                console.warn("No DIDs provided for Jetstream.");
                if (this.jetstream) {
                    this.jetstream.close();
                    this.jetstream = null;
                }
                return;
            }
            if (!this.jetstream) {
                yield this.initializeJetstream(dids);
            }
            else {
                this.jetstream.send(JSON.stringify({
                    type: "options_update",
                    payload: {
                        wantedCollections: ["app.bsky.feed.post"],
                        wantedDids: dids
                    },
                }));
                console.info(`Jetstream updated for bot: ${this.bot.username}`);
            }
        });
    }
    handleConsent(dids) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.database.deleteNoFollower(this.bot.username, dids);
            if (!dids.length) {
                return;
            }
            yield this.database.addRows(this.bot.username, dids);
            const tasks = dids.map((did) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                try {
                    const convoData = yield this.getOrCreateConvo(did);
                    if (!convoData) {
                        return;
                    }
                    const convo = convoData.convo;
                    if (!(yield ((_a = this.database) === null || _a === void 0 ? void 0 : _a.hasDmSent(this.bot.username, did)))) {
                        const dmSent = yield this.sendMessage(convo.id, this.bot.consentDm.consentQuestion);
                        if (!(dmSent === null || dmSent === void 0 ? void 0 : dmSent.error)) {
                            yield this.database.updateDmSentDate(this.bot.username, did);
                            console.info(`Consent DM sent to: ${did}`);
                        }
                    }
                    else if (((_b = convo.lastMessage) === null || _b === void 0 ? void 0 : _b.text) === ((_c = this.bot.consentDm) === null || _c === void 0 ? void 0 : _c.consentAnswer)) {
                        yield ((_d = this.database) === null || _d === void 0 ? void 0 : _d.updateConsentDate(this.bot.username, did));
                    }
                }
                catch (error) {
                    console.error(`Failed to send DM to ${did}:`, error);
                }
            }));
            yield Promise.all(tasks);
        });
    }
    getOrCreateConvo(did) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield fetch(`https://api.bsky.chat/xrpc/chat.bsky.convo.getConvoForMembers?members=${this.bot.did}&members=${did}`, {
                headers: { Authorization: `Bearer ${(_a = this.session) === null || _a === void 0 ? void 0 : _a.accessJwt}` },
            });
            if (!response.ok) {
                return null;
            }
            return yield response.json();
        });
    }
    sendMessage(convoId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const response = yield fetch("https://api.bsky.chat/xrpc/chat.bsky.convo.sendMessage", {
                method: "POST",
                headers: { "Authorization": `Bearer ${(_a = this.session) === null || _a === void 0 ? void 0 : _a.accessJwt}`, "Content-Type": "application/json" },
                body: JSON.stringify({ convoId, message: { text } }),
            });
            return yield response.json();
        });
    }
    likeAndReplyIfFollower(post) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.bot.consentDm && !(yield ((_a = this.database) === null || _a === void 0 ? void 0 : _a.hasConsentDate(this.bot.username, post.authorDid)))) {
                return;
            }
            const replyCfg = this.bot.replies.find(cfg => { var _a; return post.text.includes(cfg.keyword) && !((_a = cfg.exclude) === null || _a === void 0 ? void 0 : _a.some(ex => post.text.includes(ex))); });
            if (!replyCfg) {
                return;
            }
            const message = replyCfg.messages[Math.floor(Math.random() * replyCfg.messages.length)];
            const reply = (0, botFunctions_1.buildReplyToPost)({ uri: post.rootUri, cid: post.rootCid }, { uri: post.uri, cid: post.cid }, message);
            yield Promise.all([this.like(post.uri, post.cid), this.post(reply)]);
            console.info(`${this.bot.username} replied to post: ${post.uri}`);
        });
    }
}
exports.ReplyBotAgent = ReplyBotAgent;
const useReplyBotAgent = (bot_1, ...args_1) => __awaiter(void 0, [bot_1, ...args_1], void 0, function* (bot, interval = 20000) {
    const agent = new ReplyBotAgent({ service: 'https://bsky.social' }, bot);
    try {
        const login = yield agent.login({ identifier: bot.username, password: bot.password });
        if (!login.success) {
            return null;
        }
        if (bot.consentDm) {
            yield agent.initDatabase();
        }
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const followers = yield agent.getAllFollowers();
            if (bot.consentDm) {
                yield agent.handleConsent(followers);
            }
            yield agent.updateJetstream(followers);
        }), interval);
        return agent;
    }
    catch (error) {
        console.error("Failed to initialize bot:", error);
        return null;
    }
});
exports.useReplyBotAgent = useReplyBotAgent;
