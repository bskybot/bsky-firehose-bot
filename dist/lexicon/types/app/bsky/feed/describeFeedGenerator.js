"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFeed = isFeed;
exports.validateFeed = validateFeed;
exports.isLinks = isLinks;
exports.validateLinks = validateLinks;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isFeed(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.describeFeedGenerator#feed');
}
function validateFeed(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.describeFeedGenerator#feed', v);
}
function isLinks(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.feed.describeFeedGenerator#links');
}
function validateLinks(v) {
    return lexicons_1.lexicons.validate('app.bsky.feed.describeFeedGenerator#links', v);
}
