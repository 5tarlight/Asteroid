import { Message } from "discord.js";
import Asteroid from "../Asteroid";
import CommandExecutor, { CommandInfo } from "./CommandExecutor";

class Explore implements CommandExecutor {
  info: CommandInfo = {
    name: 'explore',
    desc: '해당 지역을 탐험합니다.',
    props: 1,
    alias: ['탐험'],
    isAdminOnly: false
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {
    
  }
}

export default Explore
