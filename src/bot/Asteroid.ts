import {Client, Guild} from 'discord.js'
import config from "../configure";
import Logger from "../Logger";
import onMessage from "./event/onMessage";
import Database from "../util/Database";
import onGuildCreate from "./event/onGuildCreate";

class Asteroid extends Client {
  public db: Database;

  constructor() {
    super()
    this.db = new Database()
  }

  // @ts-ignore
  login(token?: string): void {
    let t: string | undefined = token
    if (!token) t = config().botToken

    this.on('ready', () => {
      // @ts-ignore
      Logger.info(`Login success ${this.user.tag}`)
    })

    this.on('message', msg => onMessage(this, msg))
    this.on('guildCreate', guild => onGuildCreate(this, guild))

    this.on('error', e => Logger.err(e.toString()))
    this.on('debug', e => Logger.debug(e.toString()))
    this.on('warn', e => Logger.warn(e.toString()))

    super.login(t).then(() => {
      const getGuildData = (c: Guild) => {
        if (!c.name) {
          setTimeout(() => getGuildData(c), 1000)
        } else {
          onGuildCreate(this, c).then(() => Logger.debug(`Success to load ${c.name} (${c.id}`))
        }
      }

      this.guilds.cache.forEach(getGuildData)
    })
  }
}

export default Asteroid
