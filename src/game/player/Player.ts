import Inventory from "./Inventory";

class Player {
  username: string
  discord: string
  exp: number
  money: number
  inv: Inventory

  constructor(username: string, discord: string) {
    this.username = username
    this.discord = discord
    this.money = 1000
    this.exp = 0
    this.inv = new Inventory()
  }
}

export default Player
