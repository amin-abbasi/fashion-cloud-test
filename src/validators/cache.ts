import Joi from 'joi'
import { validate } from '../middlewares/validator'

const exportResult = {

  // Create Or Update Cache
  createOrUpdate: validate({
    body: Joi.object({
      key: Joi.string().max(50).required().description('Cache Key'),
    }),
    query: Joi.object({})
  }),

  // List All Caches
  list: validate({
    query: Joi.object({
      // size: Joi.number().default(10).description('Cache Pagination Size'),
      // page: Joi.number().default(1).description('Cache Pagination Page'),
      // key: Joi.string().max(50).description('Cache Key'),
      // dateRange: Joi.object({
      //   from: Joi.date().description('Date Range From'),
      //   to:   Joi.date().description('Date Range To'),
      // }).or('from', 'to').description('Date Range'),
    })
  }),

  // Show Cache Details
  details: validate({
    params: Joi.object({
      key: Joi.string().max(50).required().description('Cache Key'),
    }),
    query: Joi.object({})
  }),

  // Delete Cache (Hard Delete)
  delete: validate({
    params: Joi.object({
      key: Joi.string().max(50).required().description('Cache Key'),
    }),
    query: Joi.object({})
  }),

  // Delete All Caches (Hard Delete)
  deleteAll: validate({
    params: Joi.object({}),
    query: Joi.object({})
  }),

}

export default exportResult