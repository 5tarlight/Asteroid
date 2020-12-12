// import { User } from "discord.js";
// import Player from "./Player";
// import { Users } from "../../util/Database";
// import { Op } from "sequelize";
//
// class PlayerManager {
//   public  static async findByUser(user: User): Promise<Player | null> {
//     const players = await Users.findAll({
//       where: {
//         discord: { [Op.eq]: user.id }
//       }
//     })
//
//     if (players.length < 1) return null
//     else {
//
//     }
//   }
//
//   public static findByDiscord(id: string): Player {
//
//   }
// }
//
// export default PlayerManager
