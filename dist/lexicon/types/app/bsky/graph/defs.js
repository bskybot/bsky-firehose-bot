"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURATELIST = exports.MODLIST = void 0;
exports.isListViewBasic = isListViewBasic;
exports.validateListViewBasic = validateListViewBasic;
exports.isListView = isListView;
exports.validateListView = validateListView;
exports.isListItemView = isListItemView;
exports.validateListItemView = validateListItemView;
exports.isListViewerState = isListViewerState;
exports.validateListViewerState = validateListViewerState;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isListViewBasic(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.graph.defs#listViewBasic');
}
function validateListViewBasic(v) {
    return lexicons_1.lexicons.validate('app.bsky.graph.defs#listViewBasic', v);
}
function isListView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.graph.defs#listView');
}
function validateListView(v) {
    return lexicons_1.lexicons.validate('app.bsky.graph.defs#listView', v);
}
function isListItemView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.graph.defs#listItemView');
}
function validateListItemView(v) {
    return lexicons_1.lexicons.validate('app.bsky.graph.defs#listItemView', v);
}
/** A list of actors to apply an aggregate moderation action (mute/block) on */
exports.MODLIST = 'app.bsky.graph.defs#modlist';
/** A list of actors used for curation purposes such as list feeds or interaction gating */
exports.CURATELIST = 'app.bsky.graph.defs#curatelist';
function isListViewerState(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.graph.defs#listViewerState');
}
function validateListViewerState(v) {
    return lexicons_1.lexicons.validate('app.bsky.graph.defs#listViewerState', v);
}
