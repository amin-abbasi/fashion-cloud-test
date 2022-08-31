import mongoose from 'mongoose'
import uniqueV  from 'mongoose-unique-validator'
import Boom     from '@hapi/boom'
import random   from 'randomstring'
import config   from '../configs'

const { TTL, CACHE_LIMIT } = config.env

// Cache Model
export interface Cache extends mongoose.Document {
  key : string
  ttl : number
  randomString : string
  createdAt : number
  updatedAt : number
  deletedAt : number
}

export interface CacheUpdate extends mongoose.Document {
  key  : Cache['key']
  ttl? : Cache['ttl']
  randomString? : Cache['randomString']
  updatedAt?    : Cache['updatedAt']
}

// Attributes in schema
const Schema = mongoose.Schema
const schema = new Schema({
  key: { type: Schema.Types.String, required: true, unique: true },
  ttl: { type: Schema.Types.Number, required: true },
  randomString: { type: Schema.Types.String, required: true },

  // TODO: We can add 'seenAt' date and set it whenever a cache is fetched
  // TODO: Whenever we reach our cache limit we can sort them based on their most recent view
  // seenAt: { type: Schema.Types.Number, default: 0 },

  createdAt: { type: Schema.Types.Number, required: true },
  updatedAt: { type: Schema.Types.Number, default: 0 },
  deletedAt: { type: Schema.Types.Number, default: 0 },
})

// Apply the Unique Property Validator plugin to schema.
schema.plugin(uniqueV, {
  type: 'mongoose-unique-validator',
  message: 'Error, expected {PATH} to be unique.'
})

// Choose your own model name
const Cache = mongoose.model<Cache>('Cache', schema)


async function createCache(key: string, randomString?: string): Promise<Cache> {
  const caches: Cache[] = await Cache.find({ deletedAt: 0 }).sort({ updatedAt: 1, createdAt: 1 })

  // Checks the cache count limit and removes the oldest data that haven't updated yet
  if(caches.length === parseInt(CACHE_LIMIT?.toString())) {
    console.log('>>>>>>>> Delete the oldest cache data from DB - key: ', caches[0].key)
    await Cache.deleteOne({ _id: caches[0]._id })
  }

  // Create a new Cache data
  const now: number = Date.now()
  const cacheData = {
    key,
    randomString: randomString || random.generate(),
    ttl: now + parseInt(TTL.toString()),
    createdAt: now,
  }
  return await Cache.create(cacheData as Cache)
}

async function updateCache(key: string, randomString?: string): Promise<Cache> {
  const cache: Cache = await details(key)
  const now: number = Date.now()
  cache.randomString = randomString || random.generate()
  cache.ttl = now + parseInt(TTL.toString())
  cache.updatedAt = now
  return await Cache.findByIdAndUpdate(cache._id, cache, { new: true }) as Cache
}

export async function createOrUpdate(key: string, randomString?: string): Promise <Cache> {
  try {
    // Will update the existing cache with the given `key`
    return await updateCache(key, randomString)
  } catch (error) {
    // Creates a new cache with the given `key`
    return await createCache(key, randomString)
  }
}

export async function listKeys(): Promise<string[]> {
  const result: Cache[] = await Cache.find({ deletedAt: 0 })
  return result.map(cache => cache.key)
}

export async function details(key: string): Promise<Cache> {
  const cache = await Cache.findOne({ key })
  if(!cache) throw Boom.notFound('Cache not found.')
  return cache
}

export async function getOrUpdate(key: string): Promise<Cache> {
  try {
    const cache: Cache = await details(key)
    console.log('>>>>>>>> Cache hit')

    // Renew cache data that exceeded its ttl
    if(cache.ttl >= Date.now()) return cache
    console.log('>>>>>>>> Renew Cache')
    return await updateCache(key)

  } catch (error) {
    console.log('>>>>>>>> Cache miss')
    // Creates a new cache with the given `key`
    return await createCache(key)
  }
}

export async function remove(key: string): Promise<{ ok?: number, n?: number } & { deletedCount?: number }> {
  const cache: Cache = await details(key)
  return await Cache.deleteOne({ _id: cache.id })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function removeAll(): Promise<any> {
  return await Cache.collection.drop()
}

// --------------- Swagger Models Definition ---------------

/**
 * @openapi
 * components:
 *   schemas:
 *     Cache:
 *       type: object
 *       required:
 *         - key
 *         - ttl
 *         - randomString
 *       properties:
 *         key:
 *           type: string
 *         ttl:
 *           type: integer
 *         randomString:
 *           type: string
 *         createdAt:
 *           type: integer
 *         updatedAt:
 *           type: integer
 *         deletedAt:
 *           type: integer
 *       example:
 *         key: 'zzz'
 *         ttl: 12345678
 *         randomString: 'xxx123'
 */