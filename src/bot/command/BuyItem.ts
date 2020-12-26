import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message } from "discord.js";
import RichEmbed from "../../util/RichEmbed";
import config from "../../configure";
import ItemManager from "../../game/item/ItemManager";

class BuyItem implements CommandExecutor {
  info: CommandInfo = {
    name: 'buyitem',
    desc: '아이템을 삽니다.',
    isAdminOnly: false,
    alias: ['템사기', '템구매'],
    props: 2
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {
    if (args.length < 1) {
      const embed = new RichEmbed()
        .setTitle('사용법')
        .setDescription(`${config()}buyitem <아이템> [개수]`)

      msg.channel.send(embed)
      return
    }

    let tc = 0
    let count = 1
    const last = args[args.length - 1]
    if (!isNaN(+last)) {
      const c = +last
      if (c < 1) {
        const embed = new RichEmbed('err')
          .setTitle(`Error 400: BadRequest`)
          .setDescription(`${last}는 유효한 숫자가 아닙니다.`)

        msg.channel.send(embed)
        return
      }

      tc = 1
      count = c
    }

    const token = msg.content.split(' ')
    const name = token.slice(1, token.length - tc).join(' ')
    const item = ItemManager.getItem(name)
  }
}

export default BuyItem
