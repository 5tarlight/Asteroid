import CommandExecutor, { CommandInfo } from "./CommandExecutor";
import Asteroid from "../Asteroid";
import { Message } from "discord.js";

class BuyItem implements CommandExecutor {
  info: CommandInfo = {
    name: 'buyitem',
    desc: '아이템을 삽니다.',
    isAdminOnly: false,
    alias: ['템사기', '템구매'],
    props: 2
  }

  execute(client: Asteroid, msg: Message, args: string[]): void {
  }
}

export default BuyItem
