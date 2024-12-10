import { Context as HonoContext } from "hono";
import { Interaction } from "../types/interaction";
import { InteractionResponseType } from "discord-interactions";
import { Command } from "../types/command";
import { DefferedInteractionResponse, response } from "../utils/response";
import { ApplicationCommandType } from "discord-api-types/v10";
import { Bindings, Variables } from "hono/types";
import { Env } from "../types/types";

type Context = HonoContext<Env>;

const handler = async (context: Context, interaction: Interaction) => {
    console.log()
    return response(InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, {}, true);
};

const defer = async (context: Context, interaction: Interaction) => {
    (async () => {
        new Promise<void>(r => setTimeout(() => r(), 1000));
    })();
    const res = await context.var.deferResponse().createFollowup({content: "Pong!"});
    if (res.content){
        console.log(res.content);
    }
};

export const ping: Command = {
    commandData: {
        name: "ping",
        description: "Ping the bot",
        type: ApplicationCommandType.ChatInput,
    },
    handler: handler,
    deferHandler: defer,
    guildOnly: false,
};
