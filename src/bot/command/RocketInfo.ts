import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, MessageEmbed } from "discord.js";
import config from "../../configure";

class RocketInfo implements CommandExecutor {
  info: CommandInfo = {
    name: 'rocketinfo',
    desc: '로켓의 정보를 보여줍니다.',
    isAdminOnly: false,
    props: 1,
    alias: ['로켓', '로켓정보', 'ri']
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {
    if (args.length == 0) {
      const embed = new MessageEmbed()
        .setTitle('사용법')
        .setDescription(`${config().prefix}rocketinfo <로켓명>`)

      msg.channel.send(embed)
      return
    }


  }
}

export default RocketInfo
