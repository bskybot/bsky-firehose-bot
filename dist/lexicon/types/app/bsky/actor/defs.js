"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProfileViewBasic = isProfileViewBasic;
exports.validateProfileViewBasic = validateProfileViewBasic;
exports.isProfileView = isProfileView;
exports.validateProfileView = validateProfileView;
exports.isProfileViewDetailed = isProfileViewDetailed;
exports.validateProfileViewDetailed = validateProfileViewDetailed;
exports.isViewerState = isViewerState;
exports.validateViewerState = validateViewerState;
exports.isAdultContentPref = isAdultContentPref;
exports.validateAdultContentPref = validateAdultContentPref;
exports.isContentLabelPref = isContentLabelPref;
exports.validateContentLabelPref = validateContentLabelPref;
exports.isSavedFeedsPref = isSavedFeedsPref;
exports.validateSavedFeedsPref = validateSavedFeedsPref;
exports.isPersonalDetailsPref = isPersonalDetailsPref;
exports.validatePersonalDetailsPref = validatePersonalDetailsPref;
exports.isFeedViewPref = isFeedViewPref;
exports.validateFeedViewPref = validateFeedViewPref;
exports.isThreadViewPref = isThreadViewPref;
exports.validateThreadViewPref = validateThreadViewPref;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isProfileViewBasic(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#profileViewBasic');
}
function validateProfileViewBasic(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#profileViewBasic', v);
}
function isProfileView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#profileView');
}
function validateProfileView(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#profileView', v);
}
function isProfileViewDetailed(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#profileViewDetailed');
}
function validateProfileViewDetailed(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#profileViewDetailed', v);
}
function isViewerState(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#viewerState');
}
function validateViewerState(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#viewerState', v);
}
function isAdultContentPref(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#adultContentPref');
}
function validateAdultContentPref(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#adultContentPref', v);
}
function isContentLabelPref(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#contentLabelPref');
}
function validateContentLabelPref(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#contentLabelPref', v);
}
function isSavedFeedsPref(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#savedFeedsPref');
}
function validateSavedFeedsPref(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#savedFeedsPref', v);
}
function isPersonalDetailsPref(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#personalDetailsPref');
}
function validatePersonalDetailsPref(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#personalDetailsPref', v);
}
function isFeedViewPref(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#feedViewPref');
}
function validateFeedViewPref(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#feedViewPref', v);
}
function isThreadViewPref(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.actor.defs#threadViewPref');
}
function validateThreadViewPref(v) {
    return lexicons_1.lexicons.validate('app.bsky.actor.defs#threadViewPref', v);
}
