import express from 'express'
const router = express.Router()

// Add Controllers & Validators
import Controller from '../controllers/cache'
import Validator  from '../validators/cache'

// (action)             (verb)    (URI)
// create or update:    POST      - /caches
// list all keys:       GET       - /caches
// details:             GET       - /caches/:key
// delete:              DELETE    - /caches/:key
// delete all caches:   DELETE    - /caches

// ---------------------------------- Define All Cache Routes Here ----------------------------------

/**
 * @openapi
 * paths:
 *   /caches/:
 *     post:
 *       summary: Create a new cache
 *       tags: [Caches]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cache'
 *       responses:
 *         "200":
 *           $ref: '#/components/responses/Success'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 */
router.route('').post(Validator.createOrUpdate, Controller.createOrUpdate)

/**
 * @openapi
 * paths:
 *   /caches/:
 *     get:
 *       summary: Get list of all Caches
 *       tags: [Caches]
 *       responses:
 *         "200":
 *           description: Gets a list of caches as an array of objects
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Response Status
 *                   result:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         list:
 *                           $ref: '#/components/schemas/Cache'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 */
router.route('').get(Validator.list, Controller.list)

/**
 * @openapi
 * paths:
 *   /caches/{key}:
 *     get:
 *       summary: Cache Details
 *       tags: [Caches]
 *       parameters:
 *         - name: key
 *           in: path
 *           description: Cache Key
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           $ref: '#/components/responses/Success'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 *         "404":
 *           $ref: '#/components/responses/NotFound'
 */
router.route('/:key').get(Validator.details, Controller.details)

/**
 * @openapi
 * paths:
 *   /caches/{key}:
 *     delete:
 *       summary: Delete Cache
 *       tags: [Caches]
 *       parameters:
 *         - name: key
 *           in: path
 *           description: Cache Key
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           $ref: '#/components/responses/Success'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 *         "404":
 *           $ref: '#/components/responses/NotFound'
 */
router.route('/:key').delete(Validator.delete, Controller.delete)

/**
 * @openapi
 * paths:
 *   /caches:
 *     delete:
 *       summary: Delete all caches
 *       tags: [Caches]
 *       responses:
 *         "200":
 *           $ref: '#/components/responses/Success'
 *         "400":
 *           $ref: '#/components/responses/BadRequest'
 *         "401":
 *           $ref: '#/components/responses/Unauthorized'
 *         "404":
 *           $ref: '#/components/responses/NotFound'
 */
router.route('').delete(Validator.deleteAll, Controller.deleteAll)

export default router
