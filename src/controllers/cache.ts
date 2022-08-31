import { Request, NextFunction } from 'express'
import { ResponseWithResult } from '../../types/express'

import * as Model from '../models/cache'

const exportResult = {

  // Create Or Update Cache
  async createOrUpdate(req: Request, res: ResponseWithResult, next: NextFunction): Promise<void> {
    try {
      const { key, randomString }: { key: string, randomString?: string } = req.body
      const result: Model.Cache = await Model.createOrUpdate(key, randomString)
      res.result = result
      next(res)
    } catch (err) { next(err) }
  },

  // List all Cache
  async list(_req: Request, res: ResponseWithResult, next: NextFunction): Promise<void> {
    try {
      const result: string[] = await Model.listKeys()
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

  // Show Cache Details
  async details(req: Request, res: ResponseWithResult, next: NextFunction): Promise<void> {
    try {
      const key: string = req.params.key
      const result: Model.Cache = await Model.getOrUpdate(key)
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

  // Delete Cache From DB
  async delete(req: Request, res: ResponseWithResult, next: NextFunction): Promise<void> {
    try {
      const key: string = req.params.key
      const result = await Model.remove(key)
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

  // Delete All Caches From DB
  async deleteAll(_req: Request, res: ResponseWithResult, next: NextFunction): Promise<void> {
    try {
      const result = await Model.removeAll()
      res.result = result
      next(res)
    }
    catch (err) { next(err) }
  },

}

export default exportResult