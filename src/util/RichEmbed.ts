import { MessageEmbed } from "discord.js";

class RichEmbed extends MessageEmbed {
  constructor(type: string | undefined) {
    super()

    switch(type) {
      case 'err':
      case 'error':
        this.setColor('FF392B')
        break
      case 'success':
      case "succ":
        this.setColor('41F05E')
        break
      default:
        this.setColor('14146A')
    }
  }
}

export default RichEmbed
