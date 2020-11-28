import {Client, Message} from 'discord.js'
import config from "../configure";
import Logger from "../Logger";
import onMessage from "./event/onMessage";
import Database from "../util/Database";

class Asteroid extends Client {
  // @ts-ignore
  login(token?: string): void {
    let t: string | undefined = token
    if (!token) t = config().botToken

    this.on('ready', () => {
      // @ts-ignore
      Logger.info(`Login success ${this.user.tag}`)
    })

    this.on('message', (msg: Message) => {
      onMessage(this, msg)
    })

    this.on('error', e => Logger.err(e.toString()))
    this.on('debug', e => Logger.info(e.toString()))
    this.on('warn', e => Logger.warn(e.toString()))

    const db = new Database()

    super.login(t).then(() => {
      this.user?.setActivity(`${config().prefix}help`, { type: 'LISTENING'})
    })
  }
}

export default Asteroid
