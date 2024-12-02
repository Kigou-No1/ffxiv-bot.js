# ffxiv-bot.js
FF14の便利機能を提供するDiscordBotです
事前にwrangler.tomlに必要な環境変数を設定してください。
```
bun install
bun run dev
```
To deploy
```
bun install
wrangler secret put DISCORD_TOKEN
bun run deploy
```