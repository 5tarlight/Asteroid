import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message } from "discord.js";
import RichEmbed from "../../util/RichEmbed";

class Ping implements CommandExecutor {
  info: CommandInfo = {
    name: 'ping',
    isAdminOnly: false,
    desc: '봇의 지연 시간을 보내줍니다.',
    alias: ['핑'],
    props: 0
  }

  execute(client: Asteroid, msg: Message, args?: string[]): void {
    const embed = new RichEmbed()
      .setTitle(`측정중`)

    const start = new Date()
    msg.channel.send(embed).then(e => {
      const end = new Date()
      // @ts-ignore
      const diff = end - start

      const edited = new RichEmbed()
        .setTitle('완료!')
        .addField('결과', `WS: **${Math.round(client.ws.ping)}**ms\nMessage: **${diff}**ms`)

     e.edit(edited)
    })
  }
}

export default Ping
