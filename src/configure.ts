import InvalidEnvError from "./error/InvalidEnvError";

export const checkEnv = () => {
  const configs = Object.values(config())

  configs.forEach(c => {
    if (!c) throw new InvalidEnvError(".env file is not valid. Check src/configure.ts")
  })
}

const config = () => ({
  botToken: process.env.BOT_TOKEN
})

export default config
