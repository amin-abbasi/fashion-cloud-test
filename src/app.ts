import express from 'express'
import helmet  from 'helmet'
import { urlencoded, json } from 'body-parser'

const app: express.Application = express()

// ------ Initialize & Use Middle-Wares
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(helmet())

// ------ Add logger to system
import logger from './middlewares/logger'
app.use(logger)

// ------ Add all routes
import router from './routes'
app.use('/api', router)

// ------ Add response decorator
import decorator from './middlewares/decorator'
app.use(decorator)

export default app