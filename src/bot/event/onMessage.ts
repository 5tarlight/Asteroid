import { Message, MessageEmbed } from "discord.js";
import Logger from "../../Logger";
import Asteroid from "../Asteroid";
import config from "../../configure";
import Ping from "../command/Ping";
import CommandExecutor from "../command/CommandExecutor";
import Help from "../command/Help";

export const commands = [
  new Ping(),
  new Help()
]

function onMessage (client: Asteroid, msg: Message) {
  const cfg = config()
  if (msg.author.bot) return
  if (msg.channel.type == 'dm') return
  // @ts-ignore
  if (!msg.content.startsWith(cfg.prefix)) return

  const checkPermission = (): boolean => {
    // @ts-ignore
    return cfg.admin.split(' ').includes(msg.author.id)
  }
  const denyPermission = () => {
    const embed = new MessageEmbed()
      .setTitle('Fatal: Permission Denied')
      .setColor('ff392b')

    msg.channel.send(embed)
  }
  const executeCmd = (cmd: CommandExecutor, client: Asteroid, msg: Message, args: string[]) => {
    if (cmd.info.isAdminOnly) {
      if (checkPermission()) {
        cmd.execute(client, msg, args)
      } else {
        denyPermission()
      }
    } else {
      cmd.execute(client, msg, args)
    }
  }
  // @ts-ignore
  const cmd = msg.content.slice(cfg.prefix.length).split(' ')[0]
  const args = msg.content.split(' ').slice(1)

  commands.forEach(c => {
    let executed = false
    if (c.info.name == cmd) {
      executed = true
      executeCmd(c, client, msg, args)
    } else {
      c.info.alias.forEach(a => {
        if (a == cmd) {
          executed = true
          executeCmd(c, client, msg, args)
        }
      })
    }

    if (executed) {
      Logger.info(`${msg.author.id} : ${cmd}`)
    }
  })
}

export default onMessage
