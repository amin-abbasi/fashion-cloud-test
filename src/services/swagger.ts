import swaggerJSDoc from 'swagger-jsdoc'
import config       from '../configs'
const myPackage = require('../../package.json')
const { name, version, description, license, author } = myPackage

const { SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT } = config.env
const url = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/api/v1`

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: name,
    version,
    description,
    license: { name: license, url: 'http://aminabbasi.com/licenses' },
    contact: { name: author, email: 'amin4193@gmail.com' }
  },
  servers: [ { url } ],
  consumes: ['application/json'],
  produces: ['application/json'],
}

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: [
    './src/routes/*.ts',
    './src/models/*.ts',
  ],
}

const specs = swaggerJSDoc(options)
module.exports = specs
