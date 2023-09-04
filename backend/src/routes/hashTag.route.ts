import { hashTagController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: HashTags
 *   description: The hash tags managing API
 */

router.route('/get-all').get(hashTagController.getAll)

/**
 * @openapi
 * /api/v1/hashTags:
 *  get:
 *     tags: [HashTags]
 *     description: Get all hash tags
 *     responses:
 *       200:
 *         description: Get all hash tags successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/hashTags:
 *  post:
 *     tags: [HashTags]
 *     description: Create hash tag
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/HashTag'
 *     responses:
 *       200:
 *         description: Create hash tag successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

router
    .route('/')
    .get(hashTagController.getAllHashTag)
    .post(hashTagController.createHashTag)

/**
 * @openapi
 * /api/v1/hashTags/name/{hashTagName}:
 *  get:
 *     tags: [HashTags]
 *     description: Get hash tag by name
 *     parameters:
 *          - in: path
 *            name: hashTagName
 *            schema:
 *              type: string
 *            required: true
 *            description: Set name to find hash tag
 *     responses:
 *       200:
 *         description: Get hash tag by name successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/name/:hashTagName').get(hashTagController.getHashTagByName)

/**
 * @openapi
 * /api/v1/hashTags/{hashTagId}:
 *  get:
 *     tags: [HashTags]
 *     description: Get hash tag by Id
 *     parameters:
 *          - in: path
 *            name: hashTagId
 *            schema:
 *              type: integer
 *            required: true
 *            description: Set hash tag by Id
 *     responses:
 *       200:
 *         description: Get hash tag by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/hashTags/{hashTagId}:
 *  put:
 *     tags: [HashTags]
 *     description: Update hash tag by Id
 *     parameters:
 *          - in: path
 *            name: hashTagId
 *            schema:
 *              type: integer
 *            required: true
 *            description: Set hash tag by Id
 *     responses:
 *       200:
 *         description: Update hash tag by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/hashTags/{hashTagId}:
 *  delete:
 *     tags: [HashTags]
 *     description: Delete hash tag by Id
 *     parameters:
 *          - in: path
 *            name: hashTagId
 *            schema:
 *              type: integer
 *            required: true
 *            description: Set hash tag by Id
 *     responses:
 *       200:
 *         description: Delete hash tag by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router
    .route('/:hashTagId')
    .get(hashTagController.getHashTag)
    .put(hashTagController.updateHashTag)
    .delete(hashTagController.deleteHashTag)

router.use(authMiddleware.getUser)

/**
 * @openapi
 * /api/v1/hashTags/follow/{hashTagId}:
 *  get:
 *     tags: [HashTags]
 *     description: Follow hash tag
 *     parameters:
 *          - in: path
 *            name: hashTagId
 *            schema:
 *              type: integer
 *            required: true
 *            description: Set hash tag by Id
 *     responses:
 *       200:
 *         description: Follow hash tag successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/hashTags/unfollow/{hashTagId}:
 *  get:
 *     tags: [HashTags]
 *     description: UnFollow hash tag
 *     parameters:
 *          - in: path
 *            name: hashTagId
 *            schema:
 *              type: integer
 *            required: true
 *            description: Set hash tag by Id
 *     responses:
 *       200:
 *         description: UnFollow hash tag successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/follow/:hashTagId').get(hashTagController.followHashTag)
router.route('/unfollow/:hashTagId').get(hashTagController.unFollowHashTag)

export default router
