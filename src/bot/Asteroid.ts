import {Client, Message} from 'discord.js'
import config from "../configure";
import Logger from "../Logger";
import onMessage from "./event/onMessage";

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

    super.login(t).then(() => {
      this.user?.setActivity(`${config().prefix}help`, { type: 'LISTENING'})
    })
  }
}

export default Asteroid
