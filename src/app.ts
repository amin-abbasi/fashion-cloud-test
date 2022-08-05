// ------ Import npm modules
// import cors    from 'cors'
import express from 'express'
import helmet  from 'helmet'
import { urlencoded, json } from 'body-parser'

const app: express.Application = express()

// ------ Initialize & Use Middle-Wares
// app.set('trust proxy', 1)
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(helmet())
// app.use(cors())

// ------ Add config to access everywhere
import config from './configs'
app.set('config', config)

// ------ Add logger to system
import logger from './middlewares/logger'
app.use(logger)

// ------ Require all routes
import router from './routes'
app.use('/api', router)

// ------ Add Response Decorator (& error handler) to system
import decorator from './middlewares/decorator'
app.use(decorator)

export default app