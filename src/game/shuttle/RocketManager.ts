import Rocket from "./Rocket";
import StarterRocket from "./StarterRocket";

class RocketManager {
  public static rockets: Rocket[] = [
    new StarterRocket()
  ]

  public static getRocket(name: string): Rocket | null {
    const token = (r: Rocket) => r.name.split(' ')
    const rct = this.rockets.filter(r =>
      token(r).join('') == name.split(' ').join('') ||
        token(r).length > 1 &&
        token(r).slice(0, token(r).length - 1).join('') == name.split(' ').join('')
    )
    if (rct.length == 0) return null
    else return rct[0]
  }
}

export default RocketManager
