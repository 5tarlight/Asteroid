import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, MessageEmbed } from "discord.js";
import ItemManager from "../../game/item/ItemManager";
import UsableItem from "../../game/item/UsableItem";
import config from "../../configure";

class ItemInfo implements CommandExecutor {
  info: CommandInfo = {
    name: 'iteminfo',
    desc: '아이템의 정보를 보여줍니다',
    alias: ['ii', '아이템정보', '아이템', '템'],
    isAdminOnly: false,
    props: 1
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {
    if (args.length < 1) {
      const embed = new MessageEmbed()
        .setTitle('사용법')
        .setDescription(`${config().prefix}iteminfo <아이템>`)

      msg.channel.send(embed)
      return
    }

    const name = msg.content.split(' ').slice(1).join(' $')
    const item = ItemManager.getItem(name)

    if (item == null) {
      const embed = new MessageEmbed()
        .setTitle('Error 404: NotFound')
        .setDescription(`아이템 ${name}을 찾을 수 없습니다.`)
        .setColor('ff392b')

      msg.channel.send(embed)
      return
    }

    const embed = new MessageEmbed()
      .setTitle(item.info.name)

    const isUsable = (object: any): object is UsableItem => {
      return 'member' in object
    }

    if (isUsable(item)) {
      embed.addField('사용가능?', "예", true)
      embed.addField('설명', item.desc)
    } else {
      embed.addField('사용가능?', '아니요', true)
    }

    msg.channel.send(embed)
  }
}

export default ItemInfo
