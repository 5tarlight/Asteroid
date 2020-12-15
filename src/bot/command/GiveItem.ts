import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, MessageEmbed } from "discord.js";
import ItemManager from "../../game/item/ItemManager";
import config from "../../configure";
import { Inventory, Users } from "../../util/Database";
import { Op } from "sequelize";

class GiveItem implements CommandExecutor {
  info: CommandInfo = {
    name: 'giveitem',
    desc: '플레이어에게 아이템을 지급합니다.',
    isAdminOnly: true,
    props: 2,
    alias: ['아이템지급', '템지급']
  }

  async execute(client: Asteroid, msg: Message, args: string[]): Promise<void> {
    const displayHelp = () => {
      const embed = new MessageEmbed()
        .setTitle('사용법')
        .setDescription(`${config().prefix}giveitem <플레이어> <아이템> [개수] [메타]`)

      msg.channel.send(embed)
    }
    const displayBadRequest = (num: string) => {
      const embed = new MessageEmbed()
        .setTitle('Error 400: BadRequest')
        .setDescription(`${num}는 유효한 숫자가 아닙니다.`)

      msg.channel.send(embed)
    }

    const user = msg.mentions.users.first()

    if (!user) {
      displayHelp()
      return
    }

    const players = await Users.findAll({
      where: {
        discord: { [Op.eq]: user.id }
      }
    })

    if (players.length < 1) {
      const embed = new MessageEmbed()
        .setTitle('Error 404: NotFound')
        .setDescription(`플레이어 ${user.tag}을 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    const checkCount = (c: number): boolean => {
      if (c < 1) {
        displayBadRequest(c.toString())
        return false
      } else {
        return true
      }
    }
    const checkMeta = (m: number): boolean => {
      if (m < 0) {
        displayBadRequest(m.toString())
        return false
      } else {
        return true
      }
    }

    let count = 1
    let meta = 0
    let hasCount = false
    let hasMeta = false
    // Check if the query has count props and meta value
    if (args.length > 2) {
      const last = args[args.length - 1]
      const second = args[args.length - 2]

      if (!isNaN(+last)) {
        if (!isNaN(+second)) {
          hasCount = true
          hasMeta = true
        } else {
          hasCount = true
          hasMeta = false
        }
      }

      if (hasCount && hasMeta) {
        if (checkCount(parseInt(second)) && checkMeta(parseInt(last))) {
          count = parseInt(second)
          meta = parseInt(last)
        }
      } else if (hasCount && !hasMeta) {
        if (checkCount(parseInt(last))) {
          count = parseInt(last)
          meta = 0
        }
      }
    }

    let tc = 0
    if (hasCount && hasMeta) tc = 2
    else if (hasCount && !hasMeta) tc = 1

    const token = msg.content.split(' ')
    const name = token.slice(2, token.length - tc).join(' ').trim()
    const item = ItemManager.getItem(name)

    if (!item) {
      const embed = new MessageEmbed()
        .setTitle('Error 404: NotFound')
        .setDescription(`아이템 ${name}을 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    const em = new MessageEmbed()
      .setTitle('처리중...')
    msg.channel.send(em).then(async m => {
      for (let i = 0; i < count; i++) {
        await Inventory.create({
          item: item.info.name,
          owner: user.id,
          meta: meta
        })
      }

      const embed = new MessageEmbed()
        .setTitle('성공')
        .setDescription(`유저 ${user.tag}에게 ${item.info.name}:${meta} ${count}개가 지급 되었습니다.`)

      await m.edit(embed)
    })
  }
}

export default GiveItem
