/**
 * Represents a feed entry in the system.
 * 
 * - `uri`: The unique resource identifier for the entry.
 * - `cid`: The content identifier (CID) associated with this entry.
 * - `authorDid`: The Decentralized Identifier (DID) of the author who created the entry.
 * - `text`: The textual content of the entry.
 * - `rootUri`: The URI of the root entry in the conversation or thread.
 * - `rootCid`: The CID of the root entry.
 * - `indexedAt`: An optional `Date` indicating when the entry was indexed.
 */
export type Post = {
    uri: string;
    cid: string;
    authorDid: string;
    text: string;
    rootUri: string;
    rootCid: string;
    indexedAt?: Date;
};

/**
 * Represents a URI/CID pair, commonly used to reference a particular piece of content.
 * 
 * - `cid`: The content identifier (CID).
 * - `uri`: The unique resource identifier for the content.
 */
export type UriCid = {
    cid: string;
    uri: string;
};