import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, MessageEmbed } from "discord.js";

class Ping implements CommandExecutor {
  info: CommandInfo = {
    name: 'ping',
    isAdminOnly: false,
    desc: 'Show ping of bot',
    alias: ['핑'],
    props: 0
  }

  execute(client: Asteroid, msg: Message, args?: string[]): void {
    const embed = new MessageEmbed()
      .setTitle(`측정중`)

    const start = new Date()
    msg.channel.send(embed).then(e => {
      const end = new Date()
      // @ts-ignore
      const diff = end - start

      const edited = new MessageEmbed()
        .setTitle('완료!')
        .addField('결과', `WS: **${Math.round(client.ws.ping)}**ms\nMessage: **${diff}**ms`)

     e.edit(edited)
    })
  }
}

export default Ping
