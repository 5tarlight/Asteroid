import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message } from "discord.js";

class PlanetInfo implements CommandExecutor {
  info: CommandInfo = {
    name: 'planetinfo',
    desc: '행성의 정보를 보여줍니다.',
    alias: ['행성', 'pi', '플라넷', '행성정보'],
    props: 1,
    isAdminOnly: false
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {

  }
}

export default PlanetInfo
