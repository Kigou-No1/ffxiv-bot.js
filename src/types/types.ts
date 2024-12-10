import { DefferedInteractionResponse } from "../utils/response";

export type Env = {
    Bindings: {
        DISCORD_CLIENT_ID: string;
        DISCORD_PUBLIC_KEY: string;
        DISCORD_TOKEN: string;
    };
    Variables: {
        deferResponse: () => DefferedInteractionResponse;
    };
}
