import { verifyKey } from "discord-interactions";
import { MiddlewareHandler } from "hono";
import { Interaction } from "./types/interaction";
import { DefferedInteractionResponse } from "./utils/response";

export const verifyRequest = (): MiddlewareHandler => async (c, next) => {
    const signature = c.req.header("X-Signature-Ed25519");
    const timestamp = c.req.header("X-Signature-Timestamp");
    const raw = await c.req.raw.clone().text();
    const isValid = (await verifyKey(raw, signature!, timestamp!, c.env.DISCORD_PUBLIC_KEY));
    if (!isValid) {
        return c.text("invalid request signature", 401);
    }
    return await next();
};

export const responsePing = (): MiddlewareHandler => async (c, next) => {
    const interaction = await c.req.raw.clone().json<Interaction>();
    if (interaction.type === 1) {
        return c.json({ type: 1 });
    }
    return await next();
};

export const logger = (): MiddlewareHandler => async (c, next) => {
    console.log(c.req.url);
    return await next();
};

export const deferResponse = (): MiddlewareHandler => async (c, next) => {
    const token = (await c.req.raw.clone().json<Interaction>()).token;
    c.set("deferResponse", () => new DefferedInteractionResponse(c.env.DISCORD_CLIENT_ID, token, c));
    return await next();
}

/* export const ratelimitHandler = (): MiddlewareHandler => async (c, next) => {
    const interaction = await c.req.raw.clone().json<Interaction>();
    const durableObject: DurableObjectNamespace = c.env.RATELIMIT;
    const id = durableObject.idFromName(interaction.user?.id.toString()!+"_ratelimit");
    const ratelimiter = durableObject.get(id);
    const res = await ratelimiter.fetch("https://unko.unko.unko/"); // ここのURLは適当
    if (res.status === 404) {
        return await next()
    } else {
        const time = (await res.json()) as number;
        const now = Date.now();
        if (now - time >= 5000) {
            return c.text("Rate limited", 429);
        } else {
            return await next()
        }
    }
}
 */