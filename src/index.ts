import { Hono, MiddlewareHandler } from "hono";
import { InteractionType, verifyKey } from "discord-interactions";
import { Interaction } from "./types/interaction";
import { verifyRequest, responsePing, logger } from "./middleware";
import { CommandManager } from "./types/command";
import { commandNotFoundResponse } from "./utils";
import { commandManager } from "./commands";

const app = new Hono();
const commands = commandManager;
app.use(logger(), verifyRequest(), responsePing());

app.post("/", async c => {
    const interaction = await c.req.json<Interaction>();
    if (!interaction.data) return;

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        const command = commands.getCommand(interaction.data.name.toLowerCase());
        if (!command) {
            return c.json(commandNotFoundResponse());
        } else {
            const response = await command.handler(c, interaction);
            return c.json(response);
        }
    }
});

export default app;
