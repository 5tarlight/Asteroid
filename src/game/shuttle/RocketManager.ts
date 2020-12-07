import Rocket from "./Rocket";
import StarterRocket from "./StarterRocket";

class RocketManager {
  public static rockets: Rocket[] = [
    new StarterRocket()
  ]

  public static getRocket(name: string): Rocket | null {
    const rct = this.rockets.filter(r => r.name == name)
    if (rct.length == 0) return null
    else return rct[0]
  }
}

export default RocketManager
