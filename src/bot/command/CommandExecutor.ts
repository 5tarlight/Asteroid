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

class CommandExecutor {
  public execute(client: Asteroid, msg: Message, args?: string[]): void {
    Logger.err('Execute command is not defined')
  }

  public info: CommandInfo = {
    name: 'not-defined',
    alias: [],
    desc: 'Warning! this command is not defined correctly',
    props: -1,
    isAdminOnly: false
  }
}

export default CommandExecutor
