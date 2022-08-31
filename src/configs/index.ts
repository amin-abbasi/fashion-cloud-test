import dotenv from 'dotenv'
import { IConfigModel, IEnvironmentModel } from './types'
dotenv.config()

// dotenv App Environment Variables
const env = JSON.parse(JSON.stringify(process.env)) as IEnvironmentModel
if(!env) {
  console.log('No .env file was found to set environment configurations.')
  process.exit()
}

const { SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL } = env
const baseURL = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`

const config: IConfigModel = {
  env,
  baseURL,
}

export default config
