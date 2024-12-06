"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPostView = isPostView;
exports.validatePostView = validatePostView;
exports.isViewerState = isViewerState;
exports.validateViewerState = validateViewerState;
exports.isFeedViewPost = isFeedViewPost;
exports.validateFeedViewPost = validateFeedViewPost;
exports.isReplyRef = isReplyRef;
exports.validateReplyRef = validateReplyRef;
exports.isReasonRepost = isReasonRepost;
exports.validateReasonRepost = validateReasonRepost;
exports.isThreadViewPost = isThreadViewPost;
exports.validateThreadViewPost = validateThreadViewPost;
exports.isNotFoundPost = isNotFoundPost;
exports.validateNotFoundPost = validateNotFoundPost;
exports.isBlockedPost = isBlockedPost;
exports.validateBlockedPost = validateBlockedPost;
exports.isBlockedAuthor = isBlockedAuthor;
exports.validateBlockedAuthor = validateBlockedAuthor;
exports.isViewerThreadState = isViewerThreadState;
exports.validateViewerThreadState = validateViewerThreadState;
exports.isGeneratorView = isGeneratorView;
exports.validateGeneratorView = validateGeneratorView;
exports.isGeneratorViewerState = isGeneratorViewerState;
exports.validateGeneratorViewerState = validateGeneratorViewerState;
exports.isSkeletonFeedPost = isSkeletonFeedPost;
exports.validateSkeletonFeedPost = validateSkeletonFeedPost;
exports.isSkeletonReasonRepost = isSkeletonReasonRepost;
exports.validateSkeletonReasonRepost = validateSkeletonReasonRepost;
exports.isThreadgateView = isThreadgateView;
exports.validateThreadgateView = validateThreadgateView;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isPostView(v) {
    return ((0, util_1.isObj)(v) && (0, util_1.hasProp)(v, '$type') && v.$type === 'app.bsky.feed.defs#postView');
}
function validatePostView(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#postView', v);
}
function isViewerState(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#viewerState');
}
function validateViewerState(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#viewerState', v);
}
function isFeedViewPost(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#feedViewPost');
}
function validateFeedViewPost(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#feedViewPost', v);
}
function isReplyRef(v) {
    return ((0, util_1.isObj)(v) && (0, util_1.hasProp)(v, '$type') && v.$type === 'app.bsky.feed.defs#replyRef');
}
function validateReplyRef(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#replyRef', v);
}
function isReasonRepost(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#reasonRepost');
}
function validateReasonRepost(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#reasonRepost', v);
}
function isThreadViewPost(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#threadViewPost');
}
function validateThreadViewPost(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#threadViewPost', v);
}
function isNotFoundPost(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#notFoundPost');
}
function validateNotFoundPost(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#notFoundPost', v);
}
function isBlockedPost(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#blockedPost');
}
function validateBlockedPost(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#blockedPost', v);
}
function isBlockedAuthor(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#blockedAuthor');
}
function validateBlockedAuthor(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#blockedAuthor', v);
}
function isViewerThreadState(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#viewerThreadState');
}
function validateViewerThreadState(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#viewerThreadState', v);
}
function isGeneratorView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#generatorView');
}
function validateGeneratorView(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#generatorView', v);
}
function isGeneratorViewerState(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#generatorViewerState');
}
function validateGeneratorViewerState(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#generatorViewerState', v);
}
function isSkeletonFeedPost(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#skeletonFeedPost');
}
function validateSkeletonFeedPost(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#skeletonFeedPost', v);
}
function isSkeletonReasonRepost(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#skeletonReasonRepost');
}
function validateSkeletonReasonRepost(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#skeletonReasonRepost', v);
}
function isThreadgateView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.defs#threadgateView');
}
function validateThreadgateView(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.defs#threadgateView', v);
}
