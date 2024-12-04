import { ApplicationCommandType } from "discord-api-types/v10";
import { Command, CommandManager } from "../types/command";
import { ping } from "./ping";

export const commandManager = new CommandManager([
    ping,
]);
