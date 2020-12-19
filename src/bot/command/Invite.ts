import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message, Permissions } from "discord.js";
import RichEmbed from "../../util/RichEmbed";

class Invite implements CommandExecutor {
  info: CommandInfo = {
    name: 'invite',
    desc: '봇의 초대링크를 보여줍니다.',
    props: 0,
    alias: ['초대', '초대링크'],
    isAdminOnly: false
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {
    const id = client.user?.id
    const permission = Permissions.ALL
    const link = `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=${permission}&scope=bot`

    const embed = new RichEmbed()
      .setTitle('초대링크')
      .setDescription('클릭시 디스코드 공식 사이트로 이동합니다.')
      .setURL(link)

    msg.channel.send(embed)
  }
}

export default Invite
