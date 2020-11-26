import dotenv from 'dotenv'
import config, { checkEnv } from "./configure";

dotenv.config()
checkEnv()

console.dir(config().botToken)
