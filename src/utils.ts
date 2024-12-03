import { Context, Env, MiddlewareHandler } from "hono";
import { Interaction } from "./types/interaction";
import { verifyKey } from "discord-interactions";

export const verifyRequest = (): MiddlewareHandler => async (c, next) => {
    const interaction = await c.req.json<Interaction>();
    const signature = c.req.header()["X-Signature-Ed25519"];
    const timestamp = c.req.header()["X-Signature-Timestamp"];
    const raw = await c.req.raw.text();
    const isValid = signature && timestamp && await verifyKey(raw, signature, timestamp, c.env.DISCORD_PUBLIC_KEY);
    if (!isValid || !interaction.data) {
        return c.text("invalid request signature", 401);
    }
    return await next();
}

export const responsePing = (): MiddlewareHandler => async (c, next) => {
    const interaction = await c.req.json<Interaction>();
    if (interaction.type === 1) {
        return c.json({ "type": 1 });
    }
    return await next();
}

export const logger = (): MiddlewareHandler => async (c, next) => {
    console.log(c.req.url);
    return await next();
}