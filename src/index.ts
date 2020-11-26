import dotenv from 'dotenv'
import { checkEnv } from "./configure";
import Asteroid from "./bot/Asteroid";

dotenv.config()
checkEnv()

const client = new Asteroid()
client.login()
