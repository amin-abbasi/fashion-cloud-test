import expressWinston from 'express-winston'
import winston from 'winston'

const logFormat: winston.Logform.Format = winston.format.printf((info: winston.Logform.TransformableInfo) => {
  return `[${info.timestamp}] ${info.level}: ${info.message}`
})

expressWinston.requestWhitelist.push('body')
expressWinston.responseWhitelist.push('body')

const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ level: 'info', filename: `./logs/app.log` }),
    new winston.transports.File({ level: 'error', filename: `./logs/errors.log` }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
    logFormat
  ),
  meta: true,
  expressFormat: true,
  colorize: true,
})

export default logger
