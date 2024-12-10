import { Hono } from "hono";

export class Ratelimiter {
    state: DurableObjectState;
    app: Hono = new Hono();

    constructor(state: DurableObjectState) {
        this.state = state;

        this.app.get("/", async c => {
            const stored = (await this.state.storage.get("timestamp")) as number;
            await this.state.storage.put("timestamp", Date.now());
            return stored ? c.text(stored.toString()) : c.text("No timestamp stored", 404);
        });
    }

    async fetch(request: Request) {
        return this.app.fetch(request);
    }
}
