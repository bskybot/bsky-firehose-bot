"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAppPassword = isAppPassword;
exports.validateAppPassword = validateAppPassword;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isAppPassword(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.server.listAppPasswords#appPassword');
}
function validateAppPassword(v) {
    return lexicons_1.lexicons.validate('com.atproto.server.listAppPasswords#appPassword', v);
}
