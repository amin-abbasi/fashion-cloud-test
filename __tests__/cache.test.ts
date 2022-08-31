import supertest  from 'supertest'
import app    from '../src/app'
import config from '../src/configs'

jest.setTimeout(60000)
// jest.mock('../__mocks__/caches.js')

// const { SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT } = config.env
// const url = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`

// ---------------------------------- MongoDB ----------------------------------------
import mongoose from 'mongoose'
const { DB_HOST, DB_PORT } = config.env
const dbURL = `mongodb://${DB_HOST}:${DB_PORT}/cache_test_db`
const mongoDB = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise
    mongoose.connect(dbURL, { autoIndex: false })
  },
  disconnect: (done: any) => { mongoose.disconnect(done) },
}

// const request = supertest(url)
const request = supertest(app)

const body_sample = { key: 'xyz' }
let randomString: string = ''

describe('Cache Worker', () => {

  beforeAll(() => { mongoDB.connect() })
  afterAll((done) => { mongoDB.disconnect(done) })

  // Create Cache
  test('should create a cache', async () => {
    const res = await request.post('/api/v1/caches').send(body_sample)
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result).toMatchSnapshot()
    randomString = response.result.randomString
  })

  // Update Existing Cache
  test('should update a cache with existing key', async () => {
    const res = await request.post('/api/v1/caches').send(body_sample)
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result.randomString).not.toBe(randomString)
    expect(response.result).toMatchSnapshot()
    randomString = response.result.randomString
  })

  // List of Caches
  test('should get list of caches keys', async () => {
    const res = await request.get('/api/v1/caches')
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result.length).toBeGreaterThan(0)
    expect(response.result).toMatchSnapshot()
  })

  // Cache Details (Hit)
  test('should get cache details (Hit)', async () => {
    const res = await request.get('/api/v1/caches/' + body_sample.key)
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result.randomString).toBe(randomString)
    expect(response.result).toMatchSnapshot()
  })

  // Cache Details (Miss)
  test('should get cache details (Miss) [it should create new one!]', async () => {
    const res = await request.get('/api/v1/caches/' + 'abc')
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result).toMatchSnapshot()
  })

  // Delete a Cache
  test('should delete a cache', async () => {
    const res = await request.del('/api/v1/caches/' + body_sample.key)
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result).toMatchSnapshot()
  })

  // Delete a Cache [Not Found case]
  test('should show 404 error for deleting a cache that it does not exist', async () => {
    const res = await request.del('/api/v1/caches/zzz')
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(404)
    expect(response.result).toBeUndefined()
    expect(response.message).toBe('Cache not found.')
    expect(response).toMatchSnapshot()
  })

  // Delete all Caches from DB
  test('should delete all caches from DB', async () => {
    const res = await request.del('/api/v1/caches')
    const response = JSON.parse(res.text)
    expect(response.statusCode).toBe(200)
    expect(response.success).toBe(true)
    expect(response.result).toBeTruthy()
    expect(response.result).toMatchSnapshot()
  })

})
