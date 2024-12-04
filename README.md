# ffxiv-bot.js
FF14の便利機能を提供するDiscordBotです
事前にwrangler.tomlに必要な環境変数を設定してください。
## コマンドの作成
commands/[name].tsにコマンドを作成して、commands/index.ts内でcommandManagerに登録してください。
APIResponse型(utils.response()で作成)を返す必要があります。
## コマンドの同期
`bun run ./register.ts`> グローバルコマンドを同期します
`bun run ./register.ts <guild-id>` -> ギルドコマンドのみ同期します
## 実行
### 事前準備
1. `bun install`
2. wrangler.tomlに必要な環境変数を設定してください
3. `wrangler secret put DISCORD_TOKEN`を実行して、DiscordBotのトークンを設定してください
### 起動
開発用
```
bun run dev
```
本番用(Workersにデプロイされます)
```
bun run deploy
```