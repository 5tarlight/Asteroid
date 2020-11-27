import { Message } from "discord.js";
import Logger from "../../Logger";
import Asteroid from "../Asteroid";
import config from "../../configure";
import Ping from "../command/Ping";

const commands = [
  new Ping()
]

function onMessage (client: Asteroid, msg: Message) {
  const cfg = config()
  if (msg.author.bot) return
  // @ts-ignore
  if (!msg.content.startsWith(cfg.prefix)) return

  // @ts-ignore
  const cmd = msg.content.slice(cfg.prefix.length).split(' ')[0]
  const args = msg.content.split(' ').slice(1)

  commands.forEach(c => {
    let executed = false
    if (c.info.name == cmd) {
      executed = true
      c.execute(client, msg,  args)
    } else {
      c.info.alias.forEach(a => {
        if (a == cmd) {
          executed = true
          c.execute(client, msg,  args)
        }
      })
    }

    if (executed) {
      Logger.info(`${msg.author.id} : ${cmd}`)
    }
  })


}

export default onMessage
