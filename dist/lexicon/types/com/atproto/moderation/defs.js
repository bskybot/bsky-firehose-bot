"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REASONOTHER = exports.REASONRUDE = exports.REASONSEXUAL = exports.REASONMISLEADING = exports.REASONVIOLATION = exports.REASONSPAM = void 0;
/** Spam: frequent unwanted promotion, replies, mentions */
exports.REASONSPAM = 'com.atproto.moderation.defs#reasonSpam';
/** Direct violation of server rules, laws, terms of service */
exports.REASONVIOLATION = 'com.atproto.moderation.defs#reasonViolation';
/** Misleading identity, affiliation, or content */
exports.REASONMISLEADING = 'com.atproto.moderation.defs#reasonMisleading';
/** Unwanted or mislabeled sexual content */
exports.REASONSEXUAL = 'com.atproto.moderation.defs#reasonSexual';
/** Rude, harassing, explicit, or otherwise unwelcoming behavior */
exports.REASONRUDE = 'com.atproto.moderation.defs#reasonRude';
/** Other: reports not falling under another report category */
exports.REASONOTHER = 'com.atproto.moderation.defs#reasonOther';
