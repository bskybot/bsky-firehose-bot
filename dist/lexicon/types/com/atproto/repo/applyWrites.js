"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreate = isCreate;
exports.validateCreate = validateCreate;
exports.isUpdate = isUpdate;
exports.validateUpdate = validateUpdate;
exports.isDelete = isDelete;
exports.validateDelete = validateDelete;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isCreate(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.repo.applyWrites#create');
}
function validateCreate(v) {
    return lexicons_1.lexicons.validate('com.atproto.repo.applyWrites#create', v);
}
function isUpdate(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.repo.applyWrites#update');
}
function validateUpdate(v) {
    return lexicons_1.lexicons.validate('com.atproto.repo.applyWrites#update', v);
}
function isDelete(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.repo.applyWrites#delete');
}
function validateDelete(v) {
    return lexicons_1.lexicons.validate('com.atproto.repo.applyWrites#delete', v);
}
