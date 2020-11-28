import InvalidEnvError from "./error/InvalidEnvError";

export const checkEnv = () => {
  const configs = Object.values(config())
  const check = (cfg) => {
    cfg.forEach(c => {
      if (!c) throw new InvalidEnvError(".env file is not valid. Check src/configure.ts")
      if (typeof c === 'object' && c !== null) check(Object.values(c))
    })
  }

  check(configs)
}

const config = () => ({
  botToken: process.env.BOT_TOKEN,
  prefix: process.env.PREFIX,
  primaryServer: process.env.PRIMARY_SERVER_ID,
  primaryChannel: process.env.PRIMARY_CHANNEL_ID,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
})

export default config
