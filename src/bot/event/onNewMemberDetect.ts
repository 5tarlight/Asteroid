import { User } from "discord.js";
import Asteroid from "../Asteroid";
import { Users } from "../../util/Database";
import { Op } from "sequelize";
import Logger from "../../Logger";

async function onNewMemberDetect(client: Asteroid, user: User): Promise<boolean> {
  const users = await Users.findAll({
    where: {
      discord: { [Op.eq]: user.id }
    }
  })

  if (users.length != 0) return false

  await Users.create({ discord: user.id })
  Logger.info(`New user: ${user.tag} (${user.id})`)
  return true
}

export default onNewMemberDetect
