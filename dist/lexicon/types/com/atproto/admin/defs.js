"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESCALATE = exports.ACKNOWLEDGE = exports.FLAG = exports.TAKEDOWN = void 0;
exports.isActionView = isActionView;
exports.validateActionView = validateActionView;
exports.isActionViewDetail = isActionViewDetail;
exports.validateActionViewDetail = validateActionViewDetail;
exports.isActionViewCurrent = isActionViewCurrent;
exports.validateActionViewCurrent = validateActionViewCurrent;
exports.isActionReversal = isActionReversal;
exports.validateActionReversal = validateActionReversal;
exports.isReportView = isReportView;
exports.validateReportView = validateReportView;
exports.isReportViewDetail = isReportViewDetail;
exports.validateReportViewDetail = validateReportViewDetail;
exports.isRepoView = isRepoView;
exports.validateRepoView = validateRepoView;
exports.isRepoViewDetail = isRepoViewDetail;
exports.validateRepoViewDetail = validateRepoViewDetail;
exports.isRepoViewNotFound = isRepoViewNotFound;
exports.validateRepoViewNotFound = validateRepoViewNotFound;
exports.isRepoRef = isRepoRef;
exports.validateRepoRef = validateRepoRef;
exports.isRecordView = isRecordView;
exports.validateRecordView = validateRecordView;
exports.isRecordViewDetail = isRecordViewDetail;
exports.validateRecordViewDetail = validateRecordViewDetail;
exports.isRecordViewNotFound = isRecordViewNotFound;
exports.validateRecordViewNotFound = validateRecordViewNotFound;
exports.isModeration = isModeration;
exports.validateModeration = validateModeration;
exports.isModerationDetail = isModerationDetail;
exports.validateModerationDetail = validateModerationDetail;
exports.isBlobView = isBlobView;
exports.validateBlobView = validateBlobView;
exports.isImageDetails = isImageDetails;
exports.validateImageDetails = validateImageDetails;
exports.isVideoDetails = isVideoDetails;
exports.validateVideoDetails = validateVideoDetails;
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../../../util");
function isActionView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#actionView');
}
function validateActionView(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#actionView', v);
}
function isActionViewDetail(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#actionViewDetail');
}
function validateActionViewDetail(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#actionViewDetail', v);
}
function isActionViewCurrent(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#actionViewCurrent');
}
function validateActionViewCurrent(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#actionViewCurrent', v);
}
function isActionReversal(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#actionReversal');
}
function validateActionReversal(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#actionReversal', v);
}
/** Moderation action type: Takedown. Indicates that content should not be served by the PDS. */
exports.TAKEDOWN = 'com.atproto.admin.defs#takedown';
/** Moderation action type: Flag. Indicates that the content was reviewed and considered to violate PDS rules, but may still be served. */
exports.FLAG = 'com.atproto.admin.defs#flag';
/** Moderation action type: Acknowledge. Indicates that the content was reviewed and not considered to violate PDS rules. */
exports.ACKNOWLEDGE = 'com.atproto.admin.defs#acknowledge';
/** Moderation action type: Escalate. Indicates that the content has been flagged for additional review. */
exports.ESCALATE = 'com.atproto.admin.defs#escalate';
function isReportView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#reportView');
}
function validateReportView(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#reportView', v);
}
function isReportViewDetail(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#reportViewDetail');
}
function validateReportViewDetail(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#reportViewDetail', v);
}
function isRepoView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#repoView');
}
function validateRepoView(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#repoView', v);
}
function isRepoViewDetail(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#repoViewDetail');
}
function validateRepoViewDetail(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#repoViewDetail', v);
}
function isRepoViewNotFound(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#repoViewNotFound');
}
function validateRepoViewNotFound(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#repoViewNotFound', v);
}
function isRepoRef(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#repoRef');
}
function validateRepoRef(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#repoRef', v);
}
function isRecordView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#recordView');
}
function validateRecordView(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#recordView', v);
}
function isRecordViewDetail(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#recordViewDetail');
}
function validateRecordViewDetail(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#recordViewDetail', v);
}
function isRecordViewNotFound(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#recordViewNotFound');
}
function validateRecordViewNotFound(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#recordViewNotFound', v);
}
function isModeration(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#moderation');
}
function validateModeration(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#moderation', v);
}
function isModerationDetail(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#moderationDetail');
}
function validateModerationDetail(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#moderationDetail', v);
}
function isBlobView(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#blobView');
}
function validateBlobView(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#blobView', v);
}
function isImageDetails(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#imageDetails');
}
function validateImageDetails(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#imageDetails', v);
}
function isVideoDetails(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        v.$type === 'com.atproto.admin.defs#videoDetails');
}
function validateVideoDetails(v) {
    return lexicons_1.lexicons.validate('com.atproto.admin.defs#videoDetails', v);
}
