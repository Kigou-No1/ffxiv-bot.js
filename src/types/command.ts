import {
    APIApplicationCommandAutocompleteResponse,
    APIApplicationCommandOption,
    ApplicationCommandType,
} from "discord-api-types/v10";
import { Context } from "hono";
import { Interaction } from "./interaction";
import { APIResponse } from "../utils/response";

export type Command = {
    commandData: {
        name: string;
        type: ApplicationCommandType;
        description: string;
        options?: APIApplicationCommandOption[];
    };
    handler: (ctx: Context, interaction: Interaction) => Promise<APIResponse>;
    autocomplete_handler?: (
        ctx: Context,
        interaction: Interaction,
    ) => Promise<APIApplicationCommandAutocompleteResponse>;
    deferHandler?: (ctx: Context, interaction: Interaction) => Promise<void>;
    guildOnly: boolean;
    guildId?: string;
};

export class CommandManager {
    private commands: Command[];

    constructor(commands: Command[]) {
        this.commands = commands;
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
