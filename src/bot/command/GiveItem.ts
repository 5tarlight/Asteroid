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
        .setDescription(`${config().prefix}giveitem <플레이어> <아이템>`)

      msg.channel.send(embed)
    }
    const displayBadRequest = (num: string) => {
      const embed = new MessageEmbed()
        .setTitle('Error 400: BadRequest')
        .setDescription(`${num}는 유효한 숫자가 아닙니다.`)

      msg.channel.send(embed)
    }

    let count = 1
    let meta = 0
    if (args.length < 2) {
      displayHelp()
      return
    }
    if (args.length > 2) {
      if (
        isNaN(+args[2]) ||
        parseInt(args[2]) < 1 ||
        parseInt(args[2]) > 64
      ) {
        displayBadRequest(args[2])
        return
      }
      count = parseInt(args[2])
    }

    if (args.length > 3) {
      if (
        isNaN(+args[3]) || parseInt(args[3]) < 0) {
        displayBadRequest(args[3])
        return
      }
      meta = parseInt(args[3])
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

    const name = msg.content.split(' ').slice(2).join(' ').trim()
    const item = ItemManager.getItem(name)

    if (!item) {
      const embed = new MessageEmbed()
        .setTitle('Error 404: NotFound')
        .setDescription(`아이템 ${name}을 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    Inventory.create({
      item: item.info.name,
      owner: user.id,
      count: count,
      meta: meta
    }).then(() => {
      const embed = new MessageEmbed()
        .setTitle('성공')
        .setDescription(`유저 ${user.tag}에게 ${item.info.name}이 지급 되었습니다.`)

      msg.channel.send(embed)
    })
  }
}

export default GiveItem
