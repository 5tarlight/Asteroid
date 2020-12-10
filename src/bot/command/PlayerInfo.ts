import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, MessageEmbed } from "discord.js";
import { Users } from "../../util/Database";
import { Op } from "sequelize";

class PlayerInfo implements CommandExecutor {
  info: CommandInfo = {
    name: 'playerinfo',
    desc: '플레이어의 정보를 보여줍니다.',
    alias: ['플레이어', '유저', 'pi'],
    isAdminOnly: false,
    props: 1
  }

  async execute(client: Asteroid, msg: Message, args: string[]) {
    const mention = msg.mentions.users.first()
    if (mention) {
      const user = await Users.findAll({
        where: {
          discord: { [Op.eq]: mention.id }
        }
      })

      if (user.length < 1) {
        const embed = new MessageEmbed()
          .setTitle('Error 404: NotFound')
          .setDescription(`유저 ${mention.tag}를 찾을 수 없습니다.`)

        msg.channel.send(embed)
        return
      }

      // @ts-ignore
      const created = user[0].get('createdAt').toString().split(' ').slice(0, 5).join(' ')
      // @ts-ignore
      const updated = user[0].get('updatedAt').toString().split(' ').slice(0, 5).join(' ')

      const embed = new MessageEmbed()
        .setTitle(mention.tag)
        .addField('id', user[0].get('id'), true)
        .addField('경험치', user[0].get('exp'), true)
        .addField('가입일', created, true)
        .addField('마지막 갱신', updated, true)

      msg.channel.send(embed)
      return
    }
    else msg.channel.send('no mention detected')
  }
}

export default PlayerInfo
