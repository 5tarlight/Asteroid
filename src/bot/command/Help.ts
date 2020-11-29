import CommandExecutor, {CommandInfo} from "./CommandExecutor";
import Asteroid from "../Asteroid";
import {Message, MessageEmbed} from "discord.js";
import {commands} from '../event/onMessage'

class Help extends CommandExecutor {
  info: CommandInfo = {
    isAdminOnly: false,
    alias: ['도움', '도움말'],
    name: 'help',
    props: 1,
    desc: 'Get command list or command\'s information'
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {
    if (args.length > 0) {
      const cmd: CommandExecutor[] = commands.filter(
        c => c.info.name == args[0] || c.info.alias.includes(args[0])
      )

      if (cmd.length === 0) {
        const embed = new MessageEmbed()
          .setTitle('Error 404: NotFound')
          .setColor('ff392b')

        msg.channel.send(embed)
        return
      }

      const embed = new MessageEmbed()
        .setTitle('Help')

      cmd.forEach(c => {
        embed.addField(c.info.name, c.info.desc, true)
      })

      msg.channel.send(embed)
    } else {
      let embed = new MessageEmbed()
        .setTitle('Help')

      commands.forEach((cmd: CommandExecutor, i: number) => {
        if (i !== 0 && i % 20 === 0) {
          msg.author.send(embed)
          embed = new MessageEmbed()
            .setTitle('Help (continue)')
        }

        embed.addField(cmd.info.name, cmd.info.desc, true)
      })

      msg.author.send(embed)
      msg.channel.send('help message sent, check your dm!')
    }
  }
}

export default Help
