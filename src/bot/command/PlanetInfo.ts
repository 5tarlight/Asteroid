import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, MessageEmbed } from "discord.js";
import config from "../../configure";
import PlanetManager from "../../game/universe/PlanetManager";
import Minable from "../../game/universe/Minable";
import ItemManager from "../../game/item/ItemManager";
import Logger from "../../Logger";

class PlanetInfo implements CommandExecutor {
  info: CommandInfo = {
    name: 'planetinfo',
    desc: '행성의 정보를 보여줍니다.',
    alias: ['행성', 'pi', '플라넷', '행성정보'],
    props: 1,
    isAdminOnly: false
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {
    if (args.length === 0) {
      const embed = new MessageEmbed()
        .setTitle('사용법')
        .setDescription(`${config().prefix}planetinfo <행성이름>`)

      msg.channel.send(embed)
      return
    }

    const name = args[0]
    const planet = PlanetManager.getPlanet(name)

    if (planet == null) {
      const embed = new MessageEmbed()
        .setTitle('Error 404: NotFound')
        .setDescription(`행성 ${name}을 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    const embed = new MessageEmbed()
      .setTitle(planet?.info.name)
      .addField('착륙 가능?', planet.info.dockable ? '예' : '아니요')

    try {
      const pl = planet as unknown as Minable

      if (!pl.items) throw new Error()

      embed.addField('채광 가능?', '예', false)

      pl.items.forEach(mine => {
        const item = ItemManager.getItem(mine.item)

        if (!item) {
          Logger.err(`Cannot find item ${mine.item} (${__filename})`)

          const ee = new MessageEmbed()
            .setTitle('Internal Error')
            .setDescription('개발자에게 연락해 주십시오.')

          msg.channel.send(ee)
          return
        }

        embed.addField(item?.info.name, `${mine.prob * 100}%`, true)
      })
    } catch (e) {
      embed.addField('채광 가능?', '아니요', false)
    }

    msg.channel.send(embed)
  }
}

export default PlanetInfo
