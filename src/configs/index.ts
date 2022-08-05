import dotenv from 'dotenv'
import { IConfigModel, IEnvironmentModel } from './types'
dotenv.config()

const env = JSON.parse(JSON.stringify(process.env)) as IEnvironmentModel

const { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL } = env
const baseURL = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`

// All Configs that needed to be centralized
const config: IConfigModel = {

  // dotenv App Environment Variables
  env,

  // Base URL (e.g: 'https://www.your_domain.com')
  baseURL,

  // Regex
  regex: {
    objectId: /^[0-9a-fA-F]{24}$/,
  },

  // Time To Live (TTL) [milliseconds]
  ttl: 2 * 60 * 1000,    // 2 minutes

  // Cache Limit Count
  cacheLimit: 5,

}

export default config
