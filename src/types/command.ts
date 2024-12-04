import { APIApplicationCommandOption, ApplicationCommandType } from "discord-api-types/v10";
import { Context } from "hono";
import { Interaction } from "./interaction";
import { APIApplicationCommand } from "discord-api-types/v10";
import { APIResponse } from "../utils";

export type Command = {
    commandData: {
        name: string;
        type: ApplicationCommandType;
        description: string;
        options?: APIApplicationCommandOption[];
    };
    handler: (ctx: Context, interaction: Interaction) => Promise<APIResponse>;
    guildOnly?: boolean;
    guildId?: string;
};

export class CommandManager {
    private commands: Command[] = [];

    constructor(commands?: Command[]) {
        this.commands = [];
    }

    public register(command: Command) {
        this.commands.push(command);
    }

    public getCommands(): Command[] {
        return this.commands;
    }

    public getCommand(name: string): Command | undefined {
        return this.commands.find(c => c.commandData.name === name);
    }
}
