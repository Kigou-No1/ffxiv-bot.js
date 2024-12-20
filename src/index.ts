import { Hono } from "hono";
import { InteractionType } from "discord-interactions";
import { Interaction } from "./types/interaction";
import { verifyRequest, responsePing, logger, deferResponse } from "./middleware";
import { commandNotFoundResponse } from "./utils/response";
import { commandManager } from "./commands";
import { Env } from "./types/types";

const app = new Hono<Env>();
const commands = commandManager;
app.use(logger(), verifyRequest(), responsePing(), deferResponse());

app.post("/", async c => {
    const interaction = await c.req.json<Interaction>();
    if (!interaction.data) return;

    const command = commands.getCommand(interaction.data.name.toLowerCase());
    if (!command) {
        console.log("Command not found: ", interaction.data.name);
        console.log("Called type: ", interaction.type);
        return c.json(commandNotFoundResponse());
    }

    switch (interaction.type) {
        case InteractionType.APPLICATION_COMMAND:
            const result = await command.handler(c, interaction);
            const response = c.json(result.response);
            if (result.deffered && command.deferHandler) {
                c.executionCtx.waitUntil(command.deferHandler(c, interaction));
            }
            return response;
        case InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE:
            if (command.autocomplete_handler) {
                const autocomplete = await command.autocomplete_handler(c, interaction);
                return c.json(autocomplete);
            } else {
                console.log(
                    "Command does not have an autocomplete handler: ",
                    interaction.data.name,
                );
                return c.text("The command doesn't have an autocomplete handler", 501);
            }
        default:
            console.log("Unhandled interaction type: ", interaction.type);
            return c.text("Unhandled interaction type", 501);
    }
});

export default app;
