"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.validateMain = validateMain;
exports.isImage = isImage;
exports.validateImage = validateImage;
exports.isAspectRatio = isAspectRatio;
exports.validateAspectRatio = validateAspectRatio;
exports.isView = isView;
exports.validateView = validateView;
exports.isViewImage = isViewImage;
exports.validateViewImage = validateViewImage;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isMain(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        (v.$type === 'app.bsky.embed.images#main' ||
            v.$type === 'app.bsky.embed.images'));
}
function validateMain(v) {
    return lexicons_1.lexicons.validate('app.bsky.embed.images#main', v);
}
function isImage(v) {
    return ((0, util_1.isObj)(v) && (0, util_1.hasProp)(v, '$type') && v.$type === 'app.bsky.embed.images#image');
}
function validateImage(v) {
    return lexicons_1.lexicons.validate('app.bsky.embed.images#image', v);
}
function isAspectRatio(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.embed.images#aspectRatio');
}
function validateAspectRatio(v) {
    return lexicons_1.lexicons.validate('app.bsky.embed.images#aspectRatio', v);
}
function isView(v) {
    return ((0, util_1.isObj)(v) && (0, util_1.hasProp)(v, '$type') && v.$type === 'app.bsky.embed.images#view');
}
function validateView(v) {
    return lexicons_1.lexicons.validate('app.bsky.embed.images#view', v);
}
function isViewImage(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.embed.images#viewImage');
}
function validateViewImage(v) {
    return lexicons_1.lexicons.validate('app.bsky.embed.images#viewImage', v);
}
