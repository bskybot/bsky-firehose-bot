export type FeedEntry = {
    uri: string
    cid: string
    authorDid: string,
    text: string,
    rootUri: string,
    rootCid: string
    indexedAt?: Date
}

export type UriCid = {cid: string, uri: string};