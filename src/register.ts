import { commandManager } from "./commands";
import { Command } from "./types/command";

const baseURL = "https://discord.com/api/v10/applications/" + process.env.DISCORD_CLIENT_ID;
const globalURL = baseURL + "/commands";
const getGuildURL = (guildID: string) => baseURL + "/guilds/" + guildID + "/commands";

const registerGlobalCommands = async (commands: Command[]) => {
    const globalCommands = commands.filter(c => !c.guildOnly).map(c => c.commandData);

    const header = {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "DiscordBot (https://github.com/Kigou-No1/ffxiv-bot.js, 0.0.1)",
    };

    const globalResponse = await fetch(globalURL, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(globalCommands),
    });

    if (!globalResponse.ok) {
        console.error("Failed to register global commands", globalResponse.statusText);
    } else {
        console.log(`Successfully registered global ${globalCommands.length}commands`);
    }
};

const registerGuildCommands = async (commands: Command[], guildID: string) => {
    const guildCommands = commands
        .filter(c => c.guildOnly && c.guildId === guildID)
        .map(c => c.commandData);

    const header = {
        Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "DiscordBot (https://github.com/Kigou-No1/ffxiv-bot.js, 0.0.1)",
    };

    const guildResponse = await fetch(getGuildURL(guildID), {
        method: "PUT",
        headers: header,
        body: JSON.stringify(guildCommands),
    });

    if (!guildResponse.ok) {
        console.error("Failed to register global commands", guildResponse.statusText);
    } else {
        console.log(`Successfully registered guild ${guildCommands.length}commands`);
    }
};

const commands = commandManager.getCommands();
if (process.argv[2] === undefined) {
    console.log("Registering global commands...");
    registerGlobalCommands(commands);
} else {
    console.log("Registering guild commands...");
    registerGuildCommands(commands, process.argv[2]);
}
