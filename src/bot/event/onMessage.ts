import { Message, MessageEmbed } from "discord.js";
import Logger from "../../Logger";
import Asteroid from "../Asteroid";
import config from "../../configure";
import Ping from "../command/Ping";
import CommandExecutor from "../command/CommandExecutor";
import Help from "../command/Help";
import onNewMemberDetect from "./onNewMemberDetect";
import ItemInfo from "../command/ItemInfo";
import PlanetInfo from "../command/PlanetInfo";
import RocketInfo from "../command/RocketInfo";
import Invite from "../command/Invite";
import PlayerInfo from "../command/PlayerInfo";

export const commands = [
  new Ping(),
  new Help(),
  new ItemInfo(),
  new PlanetInfo(),
  new RocketInfo(),
  new Invite(),
  new PlayerInfo()
]

function onMessage (client: Asteroid, msg: Message) {
  const cfg = config()
  if (msg.author.bot) return
  if (msg.channel.type == 'dm') return
  // @ts-ignore
  if (!msg.content.startsWith(cfg.prefix)) return

  const sendNewMember = (msg: Message) => {
    const embed = new MessageEmbed()
      .setTitle('신규 유저 추가됨')
      .setDescription('<@352755226224361482>에게 연락해 데이터를 삭제 할 수 있습니다.')

    msg.channel.send(embed)
  }
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
  const executeCmd = async (cmd: CommandExecutor, client: Asteroid, msg: Message, args: string[]) => {
    if (cfg.development == 'true' || cmd.info.isAdminOnly) {
      if (checkPermission()) {
        const isNewMember = await onNewMemberDetect(client, msg.author)
        if (isNewMember) sendNewMember(msg)
        cmd.execute(client, msg, args)
      } else {
        denyPermission()
        return
      }
    } else {
      const isNewMember = await onNewMemberDetect(client, msg.author)
      if (isNewMember) sendNewMember(msg)
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
