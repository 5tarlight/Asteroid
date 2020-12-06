import Rocket from "./Rocket";

class StarterRocket implements Rocket {
  durability: number = 100;
  fuel: number = 100;
  maxDurability: number = 100;
  maxFuel: number = 100;
  tier: number = 1;
}

export default StarterRocket
