import { Message } from "discord.js";
import Logger from "../../Logger";
import Asteroid from "../Asteroid";
import config from "../../configure";

function onMessage (client: Asteroid, msg: Message) {
  if (msg.author.bot) return
  // @ts-ignore
  if (!msg.content.startsWith(config().prefix)) return

  Logger.info(`${msg.author.id} : ${msg.content}`)
}

export default onMessage
