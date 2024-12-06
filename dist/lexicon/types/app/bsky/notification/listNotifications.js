"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotification = isNotification;
exports.validateNotification = validateNotification;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isNotification(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'app.bsky.notification.listNotifications#notification');
}
function validateNotification(v) {
    return lexicons_1.lexicons.validate('app.bsky.notification.listNotifications#notification', v);
}
