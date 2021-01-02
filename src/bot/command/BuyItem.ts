import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message } from "discord.js";
import RichEmbed from "../../util/RichEmbed";
import config from "../../configure";
import ItemManager from "../../game/item/ItemManager";
import TradableItem from "../../game/item/TradableItem";
import { Inventory, Users } from "../../util/Database";
import { Op } from "sequelize";

class BuyItem implements CommandExecutor {
  info: CommandInfo = {
    name: 'buyitem',
    desc: '아이템을 삽니다.',
    isAdminOnly: false,
    alias: ['템사기', '템구매'],
    props: 2
  }

  private static surround(msg: string): string {
    return '```diff\n' + msg + '\n```'
  }

  async execute(client: Asteroid, msg: Message, args: string[]): Promise<void> {
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

    if (!item) {
      const embed = new RichEmbed('err')
        .setTitle(`아이템 ${name}을 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    try {
      const tradable = item as unknown as TradableItem
      const price = tradable.price * count

      const author = (await Users.findAll({
        where: {
          discord: { [Op.eq]: msg.author.id }
        }
      }))[0]

      if (Number(author.get('money')) < price) {
        const embed = new RichEmbed('err')
          .setTitle(`돈이 모자릅니다! (${price}/${author.get('money')})`)
          .setDescription(`${config().prefix}유저 명령어로 돈을 확인 할 수 있습니다.`)

        msg.channel.send(embed)
        return
      }

      await Users.update(
        { money: Number(author.get('money')) - price },
        {
        where: {
          discord: { [Op.eq]: msg.author.id }
        }
      })

      for (let i = 0; i < count; i++) {
        await Inventory.create({
          item: item.info.name,
          owner: msg.author.id,
          meta: 0
        })
      }

      const returnMsg = `+${name} x ${count}\n`
        + `현재 보유하고 있는 돈: ${Number(author.get('money')) - price} (-${price})`

      msg.channel.send(BuyItem.surround(returnMsg))
    } catch (e) {
      const embed = new RichEmbed('err')
        .setTitle(`아이템 ${name}은 살 수 없는 아이템입니다.`)

      msg.channel.send(embed)
      return
    }
  }
}

export default BuyItem
