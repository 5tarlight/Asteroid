import Asteroid from "../Asteroid";
import {Guild} from "discord.js";
import {Server} from "../../util/Database";
import {Op} from 'sequelize'
import Logger from "../../Logger";

async function onGuildCreate(client: Asteroid, guild: Guild) {
  const servers = await Server.findAll({
    where: {
      discord: { [Op.eq]: guild.id }
    }
  })

  if (servers.length != 0) return

  await Server.create({ discord: guild.id })
  Logger.info(`New server added: ${guild.name} (${guild.id})`)
}

export default onGuildCreate
