import dotenv from 'dotenv'
import { IConfigModel, IEnvironmentModel } from './types'
dotenv.config()

// dotenv App Environment Variables
const env = JSON.parse(JSON.stringify(process.env)) as IEnvironmentModel

const { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL } = env
const baseURL = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`

const config: IConfigModel = {
  env,
  baseURL,

  // Time To Live (TTL) [milliseconds]
  ttl: 2 * 60 * 1000,    // 2 minutes

  // Cache Limit Count
  cacheLimit: 5,

}

export default config
