import CommandExecutor, {CommandInfo} from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message } from "discord.js";

class Ping extends CommandExecutor {
  info: CommandInfo = {
    name: 'ping',
    isAdminOnly: false,
    desc: 'Show ping of bot',
    alias: ['핑'],
    props: 0
  }

  execute(client: Asteroid, msg: Message, args?: string[]): void {
    msg.reply(client.ws.ping)
  }
}

export default Ping
