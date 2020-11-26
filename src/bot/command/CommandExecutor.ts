import Logger from "../../Logger";
import Asteroid from "../Asteroid";
import { Message } from "discord.js";

class CommandExecutor {
  public execute(client: Asteroid, msg: Message, args?: string[]): void {
    Logger.err('Execute command is not defined')
  }
}

export default CommandExecutor
