import { UriCid } from "./feed"

export type WebsocketMessage = {
    did: string
    time_us: number
    kind: string
    commit: {
        rev: string
        operation: string
        collection: string
        rkey: string
        record: {
            '$type': string
            createdAt: string
            subject: string
            reply?: {
                root: UriCid
                parent: UriCid
            }
            text: string
            },
        cid: string
    }
}