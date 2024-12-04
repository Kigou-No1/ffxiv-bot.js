import { Context } from "hono";
import { Interaction } from "../types/interaction";
import { InteractionResponseType } from "discord-interactions";
import { Command } from "../types/command";
import { response } from "../utils";
import { ApplicationCommandType } from "discord-api-types/v10";

const handler = async (context: Context, interaction: Interaction) => {
    return response(InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, {
        content: "Pong!",
    });
};

export const ping: Command = {
    commandData: {
        name: "ping",
        description: "Ping the bot",
        type: ApplicationCommandType.ChatInput,
    },
    handler: handler,
};
