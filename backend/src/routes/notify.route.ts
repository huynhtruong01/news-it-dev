import { notifyController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Notifies
 *   description: The notify managing API
 */

router.use(authMiddleware.getUser)

/**
 * @openapi
 * /api/v1/notifies/get-all:
 *  get:
 *     tags: [Notifies]
 *     description: Get all notifies
 *     responses:
 *       200:
 *         description: Get all notifies successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies/multiple:
 *  post:
 *     tags: [Notifies]
 *     description: Create multiple notify
 *     responses:
 *       200:
 *         description: Create multiple notify successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies/new-news:
 *  post:
 *     tags: [Notifies]
 *     description: Create notify for news
 *     responses:
 *       200:
 *         description: Create notify for news successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies/create-comment:
 *  post:
 *     tags: [Notifies]
 *     description: Create notify for comment
 *     responses:
 *       200:
 *         description: Create notify for comment successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies/follow:
 *  post:
 *     tags: [Notifies]
 *     description: Create notify for follow
 *     responses:
 *       200:
 *         description: Create notify for follow successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies/like:
 *  post:
 *     tags: [Notifies]
 *     description: Create notify for like
 *     responses:
 *       200:
 *         description: Create notify for like successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies/reply:
 *  post:
 *     tags: [Notifies]
 *     description: Create notify for reply
 *     responses:
 *       200:
 *         description: Create notify for reply successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies/read-users/{notifyId}:
 *  get:
 *     tags: [Notifies]
 *     description: Read notify
 *     parameters:
 *          - in: path
 *            name: notifyId
 *            required: true
 *            description: Set notify Id
 *            schema:
 *              type: integer
 *     responses:
 *       200:
 *         description: Read notify successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies:
 *  get:
 *     tags: [Notifies]
 *     description: Get all notifies
 *     responses:
 *       200:
 *         description: Get all notifies successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies:
 *  post:
 *     tags: [Notifies]
 *     description: Create notify
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Notify'
 *     responses:
 *       201:
 *         description: Create notify successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies:
 *  delete:
 *     tags: [Notifies]
 *     description: Delete many notify
 *     responses:
 *       200:
 *         description: Delete many notify successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/notifies/{notifyId}:
 *  delete:
 *     tags: [Notifies]
 *     description: Delete notify by Id
 *     parameters:
 *          - in: path
 *            name: notifyId
 *            required: true
 *            description: Set comment by Id
 *            schema:
 *                type: integer
 *     responses:
 *       200:
 *         description: Delete notify by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

router.route('/get-all').get(notifyController.getAllNotifiesNoConditions)
router.route('/multiple').post(notifyController.createNotifyForComment)
router.route('/new-news').post(notifyController.newNewsNotify)
router.route('/create-comment').post(notifyController.createCommentNotify)
router.route('/follow').post(notifyController.followNews)
router.route('/like').post(notifyController.likeNewsNotify)
router.route('/reply').post(notifyController.replyCommentNotify)
router.route('/read-users/:notifyId').get(notifyController.readUsersNotify)
router
    .route('/')
    .get(notifyController.getAllNotifies)
    .post(notifyController.createNotify)
    .delete(notifyController.deleteAllNotify)
router.route('/:notifyId').delete(notifyController.deleteNotifyByNewsId)

export default router
