import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message } from "discord.js";
import { commands } from '../event/onMessage'
import RichEmbed from "../../util/RichEmbed";

class Help implements CommandExecutor {
  info: CommandInfo = {
    isAdminOnly: false,
    alias: ['도움', '도움말'],
    name: 'help',
    props: 1,
    desc: '명령어의 도움말과 정보를 보여줍니다.'
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {
    if (args.length > 0) {
      const cmd: CommandExecutor[] = commands.filter(
        c => c.info.name == args[0] || c.info.alias.includes(args[0])
      )

      if (cmd.length === 0) {
        const embed = new RichEmbed('err')
          .setTitle('Error 404: NotFound')
          .setColor('ff392b')

        msg.channel.send(embed)
        return
      }

      const embed = new RichEmbed()
        .setTitle('도움말')
        .setDescription(`${cmd[0].info.name}, ${cmd[0].info.alias.join(', ')}`)

      cmd.forEach(c => {
        embed.addField(c.info.name, c.info.desc, true)
      })

      msg.channel.send(embed)
    } else {
      let embed = new RichEmbed()
        .setTitle('도움말')

      commands.forEach((cmd: CommandExecutor, i: number) => {
        if (i !== 0 && i % 20 === 0) {
          msg.author.send(embed)
          embed = new RichEmbed()
            .setTitle('도움말 (계속)')
        }

        embed.addField(cmd.info.name, cmd.info.desc, true)
      })

      msg.author.send(embed)
      msg.channel.send('DM으로 전송되었습니다.')
    }
  }
}

export default Help
