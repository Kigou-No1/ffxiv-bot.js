import { Context } from "hono";
import { Interaction } from "../types/interaction";
import { InteractionResponseType } from "discord-interactions";

export default async function(interaction: Interaction, context: Context) {
    context.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: "Pong!" }
    })
}