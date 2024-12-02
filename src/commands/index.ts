import { ApplicationCommandType } from "discord-api-types/v10"
import { Command } from "../types/command"
import ping from "./ping"

export const commands: Command[] = [
    {
        name: "ping",
        description: "Ping pong!",
        type: ApplicationCommandType.ChatInput,
        options: [],
        run: ping,
    },   
]
