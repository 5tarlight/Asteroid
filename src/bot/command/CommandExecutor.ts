import Logger from "../../Logger";
import Asteroid from "../Asteroid";
import { Message } from "discord.js";

export interface CommandInfo {
  name: string,
  alias: string[],
  desc: string,
  props: number,
  isAdminOnly: boolean
}

abstract class CommandExecutor {
  public abstract execute(client: Asteroid, msg: Message, args?: string[]): void
  public abstract info: CommandInfo;
}

export default CommandExecutor
