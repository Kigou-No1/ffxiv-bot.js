import { APIApplicationCommandOption, ApplicationCommandType } from "discord-api-types/v10";
import { Context } from "hono";
import { Interaction } from "./interaction";

export type Command = {
    name: string;
    description: string;
    type: ApplicationCommandType;
    options: APIApplicationCommandOption[];
    run: (interaction: Interaction, context: Context) => Promise<void>;
    guildOnly?: boolean;
    guildId?: string;
}