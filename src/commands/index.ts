import { CommandManager } from "../types/command";
import { ping } from "./ping";

export const commandManager = new CommandManager([
    ping,
]);
