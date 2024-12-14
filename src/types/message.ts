import { UriCid } from "./post";

/**
 * Represents a message received over WebSocket.
 * 
 * - `did`: The Decentralized Identifier (DID) of the entity that created or owns the data.
 * - `time_us`: A timestamp in microseconds.
 * - `kind`: A string indicating the kind of message.
 * - `commit`: An object containing information about a particular commit or record creation event.
 *   - `rev`: The revision identifier of the commit.
 *   - `operation`: The type of operation performed (e.g., "create", "update", etc.).
 *   - `collection`: The name of the collection that the record belongs to.
 *   - `rkey`: The record key within the collection.
 *   - `record`: An object describing the record itself.
 *     - `'$type'`: The record's type.
 *     - `createdAt`: A timestamp indicating when the record was created.
 *     - `subject`: A string associated with the record, often referencing another entity.
 *     - `reply`: Optional object containing `root` and `parent` references (both `UriCid`) 
 *                if the record is a reply to another post.
 *     - `text`: The textual content of the record.
 *   - `cid`: The content identifier (CID) of the commit.
 */
export type WebsocketMessage = {
    did: string;
    time_us: number;
    kind: string;
    commit: {
        rev: string;
        operation: string;
        collection: string;
        rkey: string;
        record: {
            '$type': string;
            createdAt: string;
            subject: string;
            reply?: {
                root: UriCid;
                parent: UriCid;
            };
            text: string;
        };
        cid: string;
    };
};