import { Hono, MiddlewareHandler } from 'hono'
import { InteractionType, verifyKey } from 'discord-interactions';
import { Interaction } from './types/interaction';
import { verifyRequest, responsePing, logger } from './utils';

const app = new Hono()

app.use(logger(), verifyRequest(), responsePing())

app.post("/", async (c) => {
  const interaction = await c.req.json<Interaction>();
  if (!interaction.data) return

  /* if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    switch (interaction.data.name) {
      case "ping":

    }
  } */
})



export default app
