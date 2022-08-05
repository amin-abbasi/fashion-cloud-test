import mongoose from 'mongoose'
import config   from '../configs'

const { DB_HOST, DB_PORT, DB_NAME, DB_USER: user, DB_PASS: pass } = config.env
const dbURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

let options: mongoose.ConnectOptions = { autoIndex: false }
if(user && pass) options = { ...options, user, pass }

async function connectDB(): Promise<mongoose.Connection> {
  try {
    await mongoose.connect(dbURL, options)
    console.log('<<<< Connected to MongoDB >>>>')

    mongoose.Promise = global.Promise
    const db: mongoose.Connection = mongoose.connection
    return db
  } catch (error) {
    console.error('MongoDB Connection Error: ', error)
    process.exit(1)
  }
}

export default connectDB
