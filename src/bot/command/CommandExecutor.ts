import Asteroid from "../Asteroid";
import { Message } from "discord.js";

export interface CommandInfo {
  name: string,
  alias: string[],
  desc: string,
  props: number,
  isAdminOnly: boolean
}

interface CommandExecutor {
  execute(client: Asteroid, msg: Message, args: string[]): void
  info: CommandInfo;
}

export default CommandExecutor
