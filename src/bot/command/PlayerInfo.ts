import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, User } from "discord.js";
import { Users } from "../../util/Database";
import { Op } from "sequelize";
import RichEmbed from "../../util/RichEmbed";

class PlayerInfo implements CommandExecutor {
  info: CommandInfo = {
    name: 'playerinfo',
    desc: '플레이어의 정보를 보여줍니다.',
    alias: ['플레이어', '유저'],
    isAdminOnly: false,
    props: 1
  }

  async findUser(mention: User | undefined, msg: Message) {
    const notFound = () => {
      const embed = new RichEmbed('err')
        .setTitle('Error 404: NotFound')

      if (mention)
        embed.setDescription(`유저 ${mention.tag}를 찾을 수 없습니다.`)
      else
        embed.setDescription('유저를 찾을 수 없습니다.')

      msg.channel.send(embed)
      return
    }

    if (!mention) {
      notFound()
      return
    }

    const user = await Users.findAll({
      where: {
        discord: { [Op.eq]: mention.id }
      }
    })

    if (user.length < 1) {
      const embed = new RichEmbed('err')
        .setTitle('Error 404: NotFound')
        .setDescription(`유저 ${mention.tag}를 찾을 수 없습니다.`)

      msg.channel.send(embed)
      return
    }

    // @ts-ignore
    const created = user[0].get('createdAt').toString().split(' ').slice(0, 5).join(' ')
    // @ts-ignore
    const updated = user[0].get('updatedAt').toString().split(' ').slice(0, 5).join(' ')

    const embed = new RichEmbed()
      .setTitle(mention.tag)
      .addField('id', user[0].get('id'), true)
      .addField('돈', user[0].get('money'), true)
      .addField('경험치', user[0].get('exp'), true)
      .addField('가입일', created, true)
      .addField('마지막 갱신', updated, true)

    msg.channel.send(embed)
  }

  execute(client: Asteroid, msg: Message, args: string[]) {
    const mention = msg.mentions.users.first()
    if (mention) {
      this.findUser(mention, msg)
    } else {
      if (args.length < 1) {
        this.findUser(msg.author, msg)
      } else {
        const reg = /[0-1]*/
        if (reg.test(args[0])) { // getting info by id
          const user = client.users.cache.find(u => u.id == args[0])
          this.findUser(user, msg)
          return
        } else { // get user by id
          const token = msg.content.split(' ')
          const nick = msg.content.slice(1, token.length)
          const user = client.users.cache.find(u => u.username == nick)

          this.findUser(user, msg)
        }
      }
    }
  }
}

export default PlayerInfo
