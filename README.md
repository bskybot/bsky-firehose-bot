# Bluesky Reply Bot(s)
Quickly build a bot, that replies to posts of its followers that contain certain keyword(s) or phrase(s).

## Clone the repository to the desired directory and install packages
```
git clone git@github.com:bskybot/bsky-reply-bots.git
cd bsky-reply-bots/
pnpm i --frozen-lockfile
```
## Configure bot (and firehose subscription)
### Bot(s)
Rename `bot/example.index.ts` to `bot/index.ts` and edit with your preferred editor.
Note that you can define multiple bots. If you provide multiple reply messages for a keyword the bot will randomly select one of the messages. If you give an array of strings to exclude, the bot won't reply if the text contains one of the words. Also a consent dm can be defined, that has to be answered correctly before the bot reacts to a post.

A bot be defined as followed: 
```
const nameOfYourBot1: Bot = {
    username: "YourBotUsername", 
    password: "YourBotPassword",
    did: "did:plc:YourBotDid",
    replies: [
        {
            keyword: "keyword1", 
            exclude: ["badword1", "badword2"],
            messages: ["reply1", "reply2", "reply3"]
        },
        {
            keyword: "keyword2", 
            messages: ["reply"]
        },
    ]
}

const nameOfYourBot2: Bot = {
    username: "YourBotUsername", 
    password: "YourBotPassword",
    did: "did:plc:YourBotDid",
    consentDm: {
        consentQuestion: "Do you consent to my terms, answer with `Yes`.",
        consentAnswer: "Yes"
    },
    replies: [
        {
            keyword: "another keywords phrase", 
            messages: ["reply1", "reply2", "reply3"]
        },
    ]
}
```

Don't miss to add the bot to the export in `bot/index.ts`:
```
export const bots: Bot[] = [nameOfYourBot1, nameOfYourBot2];
```

## Build first and run the bot
```
pnpm build
node dist/index.js
```

Or start without building
```
pnpm start
```

Or use a tool like `pm2` to run in the background.
```
pnpm build
pm2 start dist/index.js
```