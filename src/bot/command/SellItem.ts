import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import { Message } from "discord.js";
import Asteroid from "../Asteroid";
import config from "../../configure";
import {Inventory, Users} from "../../util/Database";
import { Op } from "sequelize";
import ItemManager from "../../game/item/ItemManager";
import TradableItem from "../../game/item/TradableItem";
import RichEmbed from "../../util/RichEmbed";

class SellItem implements CommandExecutor {
  info: CommandInfo = {
    name: 'sellitem',
    desc: '아이템을 판매합니다.',
    alias: ['아이템판매', '아이템팔기', '템판매', '템팔기'],
    props: 2,
    isAdminOnly: false
  }

  async execute(client: Asteroid, msg: Message, args: string[]): Promise<void> {
    if (args.length < 1) {
      const embed = new RichEmbed()
        .setTitle('사용법')
        .setDescription(`${config().prefix}sellitem <아이템> [개수|all]`)

      msg.channel.send(embed)
      return
    }

    let tc = 0
    let count = 1
    let isAll = false
    const last = args[args.length - 1]

    if (last == 'all') {
      isAll = true
      tc = 1
    } else if ((!isNaN(+last) && Number.isInteger(+last))) {
      count = parseInt(last)
      tc = 1
    }

    const token = msg.content.split(' ')
    const name = token.slice(1, token.length - tc).join(' ')
    const targetItem = ItemManager.getItem(name)

    if (!targetItem) {
      const embed = new RichEmbed('err')
        .setTitle('Error 404: NotFound')
        .setDescription(`아이템 ${name}을 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    const currentItems = await Inventory.findAll({
      where: {
        [Op.and]: [
          { owner: { [Op.eq]: msg.author.id } },
          { item: { [Op.eq]: name } }
        ]
      }
    })

    if (isAll) count = currentItems.length

    try {
      const tradable = targetItem as unknown as TradableItem

      if (currentItems.length < count) {
        const embed = new RichEmbed('err')
          .setTitle('Error 400: BadRequest')
          .setDescription(`아이템 ${name}이 충분하지 않습니다.`)
          .addField('팁', `${config().prefix}inv 명령어로 아이템 개수를 확인할 수 있습니다.`, true)

        msg.channel.send(embed)
        return
      }

      const profit = Math.round(tradable.price * tradable.sellRate * count)

      for (let i = 0; i < count; i++) {
        const itemId = currentItems[i].get('id')

        await Inventory.destroy({
          where: {
            [Op.and]: [
              // @ts-ignore
              { id: { [Op.eq]: itemId } },
              { owner: { [Op.eq]: msg.author.id } },
              { item: { [Op.eq]: name } }
            ]
          },
          truncate: false
        })
      }

      const user = await Users.findAll({
        where: {
          discord: { [Op.eq]: msg.author.id }
        }
      })

      const currentMoney = user[0].get('money')

      // @ts-ignore
      await Users.update({ money: currentMoney + profit }, {
        where: {
          discord: { [Op.eq]: msg.author.id }
        }
      })

      const embed = new RichEmbed('succ')
        .setTitle('판매 완료!')
        .setDescription(`${profit}원을 획득했습니다.`)

      msg.channel.send(embed)
    } catch (e) {
      const embed = new RichEmbed('err')
        .setTitle('Error 400: BadRequest')
        .setDescription(`아이템 ${name}은 팔 수 없는 아이템입니다.`)

      msg.channel.send(embed)
      return
    }
  }
}

export default SellItem
