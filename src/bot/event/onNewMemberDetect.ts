import { User } from "discord.js";
import Asteroid from "../Asteroid";
import { Users } from "../../util/Database";
import { Op } from "sequelize";
import Logger from "../../Logger";
import { playerCache } from "./onMessage";
import Player from "../../game/player/Player";

async function onNewMemberDetect(client: Asteroid, user: User): Promise<boolean> {
  if (playerCache.filter(p => p.discord == user.id).length > 0) return false

  const users = await Users.findAll({
    where: {
      discord: { [Op.eq]: user.id }
    }
  })

  const player = new Player(user.username, user.id)
  // @ts-ignore
  player.exp = users[0].get('exp')
  // @ts-ignore
  player.money = users[0].get('money')
  // init inventory here

  playerCache.push(player)
  Logger.info(`${user.username} (${user.id}) cached`)

  await Users.create({ discord: user.id })
  Logger.info(`New user: ${user.tag} (${user.id})`)
  return true
}

export default onNewMemberDetect
