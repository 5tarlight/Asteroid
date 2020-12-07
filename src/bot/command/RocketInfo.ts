import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, MessageEmbed } from "discord.js";
import config from "../../configure";
import RocketManager from "../../game/shuttle/RocketManager";

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

    const rocket = RocketManager.getRocket(args.join(' '))

    if (rocket == null) {
      const embed = new MessageEmbed()
        .setTitle('Error 404: NotFound')
        .setDescription(`로켓 ${args.join(' ')}를 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    const embed = new MessageEmbed()
      .setTitle(rocket.name)
      .setDescription(`${rocket.tier}레벨`)
      .addField('최대 연료', rocket.maxFuel, true)
      .addField('최대 내구도', rocket.maxDurability, true)

    msg.channel.send(embed)
  }
}

export default RocketInfo
