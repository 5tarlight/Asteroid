import CommandExecutor, {CommandInfo} from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, MessageEmbed } from "discord.js";

interface PingResult {
  ws: number[],
  msg: number[]
}

class Ping extends CommandExecutor {
  info: CommandInfo = {
    name: 'ping',
    isAdminOnly: false,
    desc: 'Show ping of bot',
    alias: ['핑'],
    props: 0
  }

  execute(client: Asteroid, msg: Message, args?: string[]): void {
    const embed = new MessageEmbed()
      .setTitle(`estimating`)

    const start = new Date()
    msg.channel.send(embed).then(e => {
      const end = new Date()
      // @ts-ignore
      const diff = end - start

      const edited = new MessageEmbed()
        .setTitle('Complete!')
        .addField('Result', `WS: **${Math.round(client.ws.ping)}**ms\nMessage: **${diff}**ms`)

     e.edit(edited)
    })
  }
}

export default Ping
