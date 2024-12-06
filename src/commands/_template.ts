import { Context } from "hono";
import { Interaction } from "../types/interaction";
import { InteractionResponseType } from "discord-interactions";
import { Command } from "../types/command";
import { autocompleteResponse, DefferedInteractionResponse, response } from "../utils";
import {
    APIApplicationCommandAutocompleteInteraction,
    APIApplicationCommandInteractionDataStringOption,
    ApplicationCommandType,
} from "discord-api-types/v10";

const handler = async (context: Context, interaction: Interaction) => {
    // TODO: Implement the command handler
    return response(InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE, {
        content: "Test command",
    });
};

const autocompleteHandler = async (context: Context, interaction: Interaction) => {
    const autocomplete = interaction as unknown as APIApplicationCommandAutocompleteInteraction; // Get autocomplete object
    const option = autocomplete.data.options.find(
        o => o.name === "test",
    ) as unknown as APIApplicationCommandInteractionDataStringOption; // Get the option object
    // TODO: Implement the autocomplete handler
    if (option.value.startsWith("aa")) {
        return autocompleteResponse({
            choices: [
                {
                    name: "aa",
                    value: "aa",
                },
                {
                    name: "aab",
                    value: "aab",
                },
                {
                    name: "aac",
                    value: "aac",
                },
            ],
        });
    } else {
        return autocompleteResponse({
            choices: [],
        });
    }
};

const deferHandler = async (context: Context, interaction: Interaction) => {
    // Autocomplete, mainHandler の時はindex.tsでレスポンスを返すだけですが、
    // deferするときはここでfollowupまたはoriginalMessageを編集する必要があります。
    // また、handlerでresponse(InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, ...)でレスポンスを返す必要があります。

    const veryverylongprocess = async () => {
        new Promise<void>(r => setTimeout(() => r(), 10000000))
    } // よくわかんないけど長そうな処理
    await veryverylongprocess()

    const defferedResponse = new DefferedInteractionResponse(context.env.DISCORD_CLIENT_ID, interaction.token)
    const res = await defferedResponse.createFollowup({
        content: "Deffered response!",
    });
    // Or
    // defferedResponse.editOriginal({
    //     content: "Deffered response!",
    // })
}

export const commandName: Command = {
    commandData: {
        name: "_example",
        description: "exampleCommand",
        type: ApplicationCommandType.ChatInput,
    },
    handler: handler,
    autocomplete_handler: autocompleteHandler,
    deferHandler: deferHandler,
    guildOnly: false,
};
