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
    query: Joi.object({})
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