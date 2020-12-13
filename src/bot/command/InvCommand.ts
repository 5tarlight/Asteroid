import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, MessageEmbed } from "discord.js";
import { Inventory as InvModel } from "../../util/Database";
import {Op} from "sequelize";
import ItemManager from "../../game/item/ItemManager";
import config from "../../configure";

class InvCommand implements CommandExecutor {
  info: CommandInfo = {
    name: 'inventory',
    desc: '자신의 인벤토리에서 아이템을 검색합니다.',
    alias: ['인벤', '인벤토리', 'inv'],
    props: 1,
    isAdminOnly: false
  }

  async execute(client: Asteroid, msg: Message, args: string[]): Promise<void> {
    if (args.length < 1) {
      const embed = new MessageEmbed()
        .setTitle('사용법')
        .setDescription(`${config().prefix}inv <아이템 이름>`)

      msg.channel.send(embed)
      return
    }
    const name = msg.content.split(' ').slice(1).join(' ')
    const item = ItemManager.getItem(name)

    if (!item) {
      const embed = new MessageEmbed()
        .setTitle('Error 404: NotFound')
        .setDescription(`아이템 ${name}을 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    const items = await InvModel.findAll({
      where: {
        [Op.and]: [
          { owner: { [Op.eq]: msg.author.id } },
          { item: { [Op.eq]: item.info.name } }
        ]
      }
    })

    if (items.length < 1) {
      msg.channel.send(`아이템 \`${item.info.name}\`이 없습니다.`)
    } else {
      msg.channel.send(`아이템 \`${item.info.name}\`을 \`${items.length}\`개 소지하고 있습니다.`)
    }
  }
}

export default InvCommand
