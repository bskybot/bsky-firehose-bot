"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLabel = isLabel;
exports.validateLabel = validateLabel;
exports.isSelfLabels = isSelfLabels;
exports.validateSelfLabels = validateSelfLabels;
exports.isSelfLabel = isSelfLabel;
exports.validateSelfLabel = validateSelfLabel;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isLabel(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.label.defs#label');
}
function validateLabel(v) {
    return lexicons_1.lexicons.validate('com.atproto.label.defs#label', v);
}
function isSelfLabels(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.label.defs#selfLabels');
}
function validateSelfLabels(v) {
    return lexicons_1.lexicons.validate('com.atproto.label.defs#selfLabels', v);
}
function isSelfLabel(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.label.defs#selfLabel');
}
function validateSelfLabel(v) {
    return lexicons_1.lexicons.validate('com.atproto.label.defs#selfLabel', v);
}
