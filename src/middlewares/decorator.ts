/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { STATUS_CODES } from 'http'
import { Boom } from '@hapi/boom'

// ----------------- Return Structure -----------------
// Successful Response:
// {
//   statusCode: 20x,
//   success: true,
//   result: object or array
// }

// Error Response:
// {
//   statusCode: 4xx or 5xx,
//   message: string,
//   errors: object or array
// }

interface IMongoUniqueError {
  _message : string
  errors   : any
}

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface IError extends IMongoUniqueError, Boom  {
  statusCode : number | string
  status? : number | string
  code?   : number | string
  message : string
  data?   : { [key: string]: string | boolean | unknown }
}

function decorator(err: IError, _req: Request, res: Response, next: NextFunction): void {

  // mongoose-unique-validator error
  if(err._message?.includes('validation failed')) {
    err.statusCode = 400
    err.message = 'Validation Failed.'
    err.data = JSON.parse(JSON.stringify(err.errors))
    console.log(' >>>>>> Mongoose-Unique-Validator ERROR:', err)
  }

  if(err.isBoom) {
    err.statusCode = err.output.statusCode
    err.message = err.output.payload.message
    console.log(' >>>>>> BOOM ERROR:', err)
  }

  const response = res.result ? {
    status: '',
    statusCode: res.statusCode,
    success: (typeof res.result !== 'string'),
    result: res.result,
  } : {
    statusCode: err.statusCode || (err.status || (err.code || 500)),
    message: err.message || STATUS_CODES[500],
    errors: err.data || null
  }

  if(typeof response.statusCode !== 'number') {
    response.status = response.statusCode
    response.statusCode = 500
  } else delete response.status

  if(response.statusCode >= 500) console.log(' >>>>>> SERVER ERROR:', err)

  res.status(response.statusCode).json(response)
  next()
}

export default decorator