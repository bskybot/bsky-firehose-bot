"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnspeccedNS = exports.RichtextNS = exports.NotificationNS = exports.GraphNS = exports.FeedNS = exports.EmbedNS = exports.ActorNS = exports.BskyNS = exports.AppNS = exports.SyncNS = exports.ServerNS = exports.RepoNS = exports.ModerationNS = exports.LabelNS = exports.IdentityNS = exports.AdminNS = exports.AtprotoNS = exports.ComNS = exports.Server = exports.APP_BSKY_GRAPH = exports.COM_ATPROTO_MODERATION = exports.COM_ATPROTO_ADMIN = void 0;
exports.createServer = createServer;
/**
 * GENERATED CODE - DO NOT MODIFY
 */
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("./lexicons");
exports.COM_ATPROTO_ADMIN = {
    DefsTakedown: 'com.atproto.admin.defs#takedown',
    DefsFlag: 'com.atproto.admin.defs#flag',
    DefsAcknowledge: 'com.atproto.admin.defs#acknowledge',
    DefsEscalate: 'com.atproto.admin.defs#escalate',
};
exports.COM_ATPROTO_MODERATION = {
    DefsReasonSpam: 'com.atproto.moderation.defs#reasonSpam',
    DefsReasonViolation: 'com.atproto.moderation.defs#reasonViolation',
    DefsReasonMisleading: 'com.atproto.moderation.defs#reasonMisleading',
    DefsReasonSexual: 'com.atproto.moderation.defs#reasonSexual',
    DefsReasonRude: 'com.atproto.moderation.defs#reasonRude',
    DefsReasonOther: 'com.atproto.moderation.defs#reasonOther',
};
exports.APP_BSKY_GRAPH = {
    DefsModlist: 'app.bsky.graph.defs#modlist',
    DefsCuratelist: 'app.bsky.graph.defs#curatelist',
};
function createServer(options) {
    return new Server(options);
}
class Server {
    constructor(options) {
        this.xrpc = (0, xrpc_server_1.createServer)(lexicons_1.schemas, options);
        this.com = new ComNS(this);
        this.app = new AppNS(this);
    }
}
exports.Server = Server;
class ComNS {
    constructor(server) {
        this._server = server;
        this.atproto = new AtprotoNS(server);
    }
}
exports.ComNS = ComNS;
class AtprotoNS {
    constructor(server) {
        this._server = server;
        this.admin = new AdminNS(server);
        this.identity = new IdentityNS(server);
        this.label = new LabelNS(server);
        this.moderation = new ModerationNS(server);
        this.repo = new RepoNS(server);
        this.server = new ServerNS(server);
        this.sync = new SyncNS(server);
    }
}
exports.AtprotoNS = AtprotoNS;
class AdminNS {
    constructor(server) {
        this._server = server;
    }
    disableAccountInvites(cfg) {
        const nsid = 'com.atproto.admin.disableAccountInvites'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    disableInviteCodes(cfg) {
        const nsid = 'com.atproto.admin.disableInviteCodes'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    enableAccountInvites(cfg) {
        const nsid = 'com.atproto.admin.enableAccountInvites'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getInviteCodes(cfg) {
        const nsid = 'com.atproto.admin.getInviteCodes'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getModerationAction(cfg) {
        const nsid = 'com.atproto.admin.getModerationAction'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getModerationActions(cfg) {
        const nsid = 'com.atproto.admin.getModerationActions'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getModerationReport(cfg) {
        const nsid = 'com.atproto.admin.getModerationReport'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getModerationReports(cfg) {
        const nsid = 'com.atproto.admin.getModerationReports'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getRecord(cfg) {
        const nsid = 'com.atproto.admin.getRecord'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getRepo(cfg) {
        const nsid = 'com.atproto.admin.getRepo'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    resolveModerationReports(cfg) {
        const nsid = 'com.atproto.admin.resolveModerationReports'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    reverseModerationAction(cfg) {
        const nsid = 'com.atproto.admin.reverseModerationAction'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    searchRepos(cfg) {
        const nsid = 'com.atproto.admin.searchRepos'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    sendEmail(cfg) {
        const nsid = 'com.atproto.admin.sendEmail'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    takeModerationAction(cfg) {
        const nsid = 'com.atproto.admin.takeModerationAction'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    updateAccountEmail(cfg) {
        const nsid = 'com.atproto.admin.updateAccountEmail'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    updateAccountHandle(cfg) {
        const nsid = 'com.atproto.admin.updateAccountHandle'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.AdminNS = AdminNS;
class IdentityNS {
    constructor(server) {
        this._server = server;
    }
    resolveHandle(cfg) {
        const nsid = 'com.atproto.identity.resolveHandle'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    updateHandle(cfg) {
        const nsid = 'com.atproto.identity.updateHandle'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.IdentityNS = IdentityNS;
class LabelNS {
    constructor(server) {
        this._server = server;
    }
    queryLabels(cfg) {
        const nsid = 'com.atproto.label.queryLabels'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    subscribeLabels(cfg) {
        const nsid = 'com.atproto.label.subscribeLabels'; // @ts-ignore
        return this._server.xrpc.streamMethod(nsid, cfg);
    }
}
exports.LabelNS = LabelNS;
class ModerationNS {
    constructor(server) {
        this._server = server;
    }
    createReport(cfg) {
        const nsid = 'com.atproto.moderation.createReport'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.ModerationNS = ModerationNS;
class RepoNS {
    constructor(server) {
        this._server = server;
    }
    applyWrites(cfg) {
        const nsid = 'com.atproto.repo.applyWrites'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    createRecord(cfg) {
        const nsid = 'com.atproto.repo.createRecord'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    deleteRecord(cfg) {
        const nsid = 'com.atproto.repo.deleteRecord'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    describeRepo(cfg) {
        const nsid = 'com.atproto.repo.describeRepo'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getRecord(cfg) {
        const nsid = 'com.atproto.repo.getRecord'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    listRecords(cfg) {
        const nsid = 'com.atproto.repo.listRecords'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    putRecord(cfg) {
        const nsid = 'com.atproto.repo.putRecord'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    uploadBlob(cfg) {
        const nsid = 'com.atproto.repo.uploadBlob'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.RepoNS = RepoNS;
class ServerNS {
    constructor(server) {
        this._server = server;
    }
    createAccount(cfg) {
        const nsid = 'com.atproto.server.createAccount'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    createAppPassword(cfg) {
        const nsid = 'com.atproto.server.createAppPassword'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    createInviteCode(cfg) {
        const nsid = 'com.atproto.server.createInviteCode'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    createInviteCodes(cfg) {
        const nsid = 'com.atproto.server.createInviteCodes'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    createSession(cfg) {
        const nsid = 'com.atproto.server.createSession'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    deleteAccount(cfg) {
        const nsid = 'com.atproto.server.deleteAccount'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    deleteSession(cfg) {
        const nsid = 'com.atproto.server.deleteSession'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    describeServer(cfg) {
        const nsid = 'com.atproto.server.describeServer'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getAccountInviteCodes(cfg) {
        const nsid = 'com.atproto.server.getAccountInviteCodes'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getSession(cfg) {
        const nsid = 'com.atproto.server.getSession'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    listAppPasswords(cfg) {
        const nsid = 'com.atproto.server.listAppPasswords'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    refreshSession(cfg) {
        const nsid = 'com.atproto.server.refreshSession'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    requestAccountDelete(cfg) {
        const nsid = 'com.atproto.server.requestAccountDelete'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    requestPasswordReset(cfg) {
        const nsid = 'com.atproto.server.requestPasswordReset'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    resetPassword(cfg) {
        const nsid = 'com.atproto.server.resetPassword'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    revokeAppPassword(cfg) {
        const nsid = 'com.atproto.server.revokeAppPassword'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.ServerNS = ServerNS;
class SyncNS {
    constructor(server) {
        this._server = server;
    }
    getBlob(cfg) {
        const nsid = 'com.atproto.sync.getBlob'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getBlocks(cfg) {
        const nsid = 'com.atproto.sync.getBlocks'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getCheckout(cfg) {
        const nsid = 'com.atproto.sync.getCheckout'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getHead(cfg) {
        const nsid = 'com.atproto.sync.getHead'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getLatestCommit(cfg) {
        const nsid = 'com.atproto.sync.getLatestCommit'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getRecord(cfg) {
        const nsid = 'com.atproto.sync.getRecord'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getRepo(cfg) {
        const nsid = 'com.atproto.sync.getRepo'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    listBlobs(cfg) {
        const nsid = 'com.atproto.sync.listBlobs'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    listRepos(cfg) {
        const nsid = 'com.atproto.sync.listRepos'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    notifyOfUpdate(cfg) {
        const nsid = 'com.atproto.sync.notifyOfUpdate'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    requestCrawl(cfg) {
        const nsid = 'com.atproto.sync.requestCrawl'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    subscribeRepos(cfg) {
        const nsid = 'com.atproto.sync.subscribeRepos'; // @ts-ignore
        return this._server.xrpc.streamMethod(nsid, cfg);
    }
}
exports.SyncNS = SyncNS;
class AppNS {
    constructor(server) {
        this._server = server;
        this.bsky = new BskyNS(server);
    }
}
exports.AppNS = AppNS;
class BskyNS {
    constructor(server) {
        this._server = server;
        this.actor = new ActorNS(server);
        this.embed = new EmbedNS(server);
        this.feed = new FeedNS(server);
        this.graph = new GraphNS(server);
        this.notification = new NotificationNS(server);
        this.richtext = new RichtextNS(server);
        this.unspecced = new UnspeccedNS(server);
    }
}
exports.BskyNS = BskyNS;
class ActorNS {
    constructor(server) {
        this._server = server;
    }
    getPreferences(cfg) {
        const nsid = 'app.bsky.actor.getPreferences'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getProfile(cfg) {
        const nsid = 'app.bsky.actor.getProfile'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getProfiles(cfg) {
        const nsid = 'app.bsky.actor.getProfiles'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getSuggestions(cfg) {
        const nsid = 'app.bsky.actor.getSuggestions'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    putPreferences(cfg) {
        const nsid = 'app.bsky.actor.putPreferences'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    searchActors(cfg) {
        const nsid = 'app.bsky.actor.searchActors'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    searchActorsTypeahead(cfg) {
        const nsid = 'app.bsky.actor.searchActorsTypeahead'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.ActorNS = ActorNS;
class EmbedNS {
    constructor(server) {
        this._server = server;
    }
}
exports.EmbedNS = EmbedNS;
class FeedNS {
    constructor(server) {
        this._server = server;
    }
    describeFeedGenerator(cfg) {
        const nsid = 'app.bsky.feed.describeFeedGenerator'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getActorFeeds(cfg) {
        const nsid = 'app.bsky.feed.getActorFeeds'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getActorLikes(cfg) {
        const nsid = 'app.bsky.feed.getActorLikes'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getAuthorFeed(cfg) {
        const nsid = 'app.bsky.feed.getAuthorFeed'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getFeed(cfg) {
        const nsid = 'app.bsky.feed.getFeed'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getFeedGenerator(cfg) {
        const nsid = 'app.bsky.feed.getFeedGenerator'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getFeedGenerators(cfg) {
        const nsid = 'app.bsky.feed.getFeedGenerators'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getFeedSkeleton(cfg) {
        const nsid = 'app.bsky.feed.getFeedSkeleton'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getLikes(cfg) {
        const nsid = 'app.bsky.feed.getLikes'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getListFeed(cfg) {
        const nsid = 'app.bsky.feed.getListFeed'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getPostThread(cfg) {
        const nsid = 'app.bsky.feed.getPostThread'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getPosts(cfg) {
        const nsid = 'app.bsky.feed.getPosts'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getRepostedBy(cfg) {
        const nsid = 'app.bsky.feed.getRepostedBy'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getSuggestedFeeds(cfg) {
        const nsid = 'app.bsky.feed.getSuggestedFeeds'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getTimeline(cfg) {
        const nsid = 'app.bsky.feed.getTimeline'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    searchPosts(cfg) {
        const nsid = 'app.bsky.feed.searchPosts'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.FeedNS = FeedNS;
class GraphNS {
    constructor(server) {
        this._server = server;
    }
    getBlocks(cfg) {
        const nsid = 'app.bsky.graph.getBlocks'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getFollowers(cfg) {
        const nsid = 'app.bsky.graph.getFollowers'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getFollows(cfg) {
        const nsid = 'app.bsky.graph.getFollows'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getList(cfg) {
        const nsid = 'app.bsky.graph.getList'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getListBlocks(cfg) {
        const nsid = 'app.bsky.graph.getListBlocks'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getListMutes(cfg) {
        const nsid = 'app.bsky.graph.getListMutes'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getLists(cfg) {
        const nsid = 'app.bsky.graph.getLists'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getMutes(cfg) {
        const nsid = 'app.bsky.graph.getMutes'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getSuggestedFollowsByActor(cfg) {
        const nsid = 'app.bsky.graph.getSuggestedFollowsByActor'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    muteActor(cfg) {
        const nsid = 'app.bsky.graph.muteActor'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    muteActorList(cfg) {
        const nsid = 'app.bsky.graph.muteActorList'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    unmuteActor(cfg) {
        const nsid = 'app.bsky.graph.unmuteActor'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    unmuteActorList(cfg) {
        const nsid = 'app.bsky.graph.unmuteActorList'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.GraphNS = GraphNS;
class NotificationNS {
    constructor(server) {
        this._server = server;
    }
    getUnreadCount(cfg) {
        const nsid = 'app.bsky.notification.getUnreadCount'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    listNotifications(cfg) {
        const nsid = 'app.bsky.notification.listNotifications'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    registerPush(cfg) {
        const nsid = 'app.bsky.notification.registerPush'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    updateSeen(cfg) {
        const nsid = 'app.bsky.notification.updateSeen'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.NotificationNS = NotificationNS;
class RichtextNS {
    constructor(server) {
        this._server = server;
    }
}
exports.RichtextNS = RichtextNS;
class UnspeccedNS {
    constructor(server) {
        this._server = server;
    }
    getPopular(cfg) {
        const nsid = 'app.bsky.unspecced.getPopular'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getPopularFeedGenerators(cfg) {
        const nsid = 'app.bsky.unspecced.getPopularFeedGenerators'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    getTimelineSkeleton(cfg) {
        const nsid = 'app.bsky.unspecced.getTimelineSkeleton'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    searchActorsSkeleton(cfg) {
        const nsid = 'app.bsky.unspecced.searchActorsSkeleton'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
    searchPostsSkeleton(cfg) {
        const nsid = 'app.bsky.unspecced.searchPostsSkeleton'; // @ts-ignore
        return this._server.xrpc.method(nsid, cfg);
    }
}
exports.UnspeccedNS = UnspeccedNS;
