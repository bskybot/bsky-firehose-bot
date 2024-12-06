"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommit = isCommit;
exports.validateCommit = validateCommit;
exports.isHandle = isHandle;
exports.validateHandle = validateHandle;
exports.isMigrate = isMigrate;
exports.validateMigrate = validateMigrate;
exports.isTombstone = isTombstone;
exports.validateTombstone = validateTombstone;
exports.isInfo = isInfo;
exports.validateInfo = validateInfo;
exports.isRepoOp = isRepoOp;
exports.validateRepoOp = validateRepoOp;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isCommit(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.sync.subscribeRepos#commit');
}
function validateCommit(v) {
    return lexicons_1.lexicons.validate('com.atproto.sync.subscribeRepos#commit', v);
}
function isHandle(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.sync.subscribeRepos#handle');
}
function validateHandle(v) {
    return lexicons_1.lexicons.validate('com.atproto.sync.subscribeRepos#handle', v);
}
function isMigrate(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.sync.subscribeRepos#migrate');
}
function validateMigrate(v) {
    return lexicons_1.lexicons.validate('com.atproto.sync.subscribeRepos#migrate', v);
}
function isTombstone(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.sync.subscribeRepos#tombstone');
}
function validateTombstone(v) {
    return lexicons_1.lexicons.validate('com.atproto.sync.subscribeRepos#tombstone', v);
}
function isInfo(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.sync.subscribeRepos#info');
}
function validateInfo(v) {
    return lexicons_1.lexicons.validate('com.atproto.sync.subscribeRepos#info', v);
}
function isRepoOp(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.sync.subscribeRepos#repoOp');
}
function validateRepoOp(v) {
    return lexicons_1.lexicons.validate('com.atproto.sync.subscribeRepos#repoOp', v);
}
