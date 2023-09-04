import { userController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @openapi
 * /api/v1/users/name/{userName}:
 *  get:
 *     tags: [Users]
 *     description: Get user by username
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         description: Set user by username
 *         required: true
 *     responses:
 *       200:
 *         description: Get user by username successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/name/:userName').get(userController.getUserByUsername)

/**
 * @openapi
 * /api/v1/users/top:
 *  get:
 *     tags: [Users]
 *     description: Get top user
 *     responses:
 *       200:
 *         description: Get user top successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/top').get(userController.getTopUsers)

router.use(authMiddleware.getUser)

/**
 * @openapi
 * /api/v1/users/suggestion:
 *  get:
 *     tags: [Users]
 *     description: Suggestion users
 *     responses:
 *       200:
 *         description: Suggestion users successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/suggestion').get(userController.getAllUserSuggestion)

/**
 * @openapi
 * /api/v1/users/profile:
 *  get:
 *     tags: [Users]
 *     description: Get profile user (yourself)
 *     responses:
 *       200:
 *         description: Get profile user successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/users/profile:
 *  put:
 *     tags: [Users]
 *     description: Update profile user (yourself)
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Update profile user successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router
    .route('/profile')
    .get(userController.getProfile)
    .put(userController.updateProfileUser)

/**
 * @openapi
 * /api/v1/users:
 *  get:
 *     tags: [Users]
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Get all users successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/users:
 *  post:
 *     tags: [Users]
 *     description: Create user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Create user successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/').get(userController.getAllUser).post(userController.addUser)

/**
 * @openapi
 * /api/v1/users/profile/{userId}:
 *  get:
 *     tags: [Users]
 *     description: Get profile by Id
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Set user Id
 *         required: true
 *     responses:
 *       200:
 *         description: Get profile by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/profile/:userId').get(userController.getProfileSaveFilters)

/**
 * @openapi
 * /api/v1/users/{userId}:
 *  get:
 *     tags: [Users]
 *     description: Get user by Id
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Set user Id
 *         required: true
 *     responses:
 *       200:
 *         description: Get user by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/users/{userId}:
 *  put:
 *     tags: [Users]
 *     description: Update user by Id
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Set user Id
 *         required: true
 *     responses:
 *       200:
 *         description: Update user by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/users/{userId}:
 *  delete:
 *     tags: [Users]
 *     description: Delete user by Id
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Set user Id
 *         required: true
 *     responses:
 *       200:
 *         description: Delete user by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router
    .route('/:userId')
    .get(userController.getUser)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)

/**
 * @openapi
 * /api/v1/users/follow/{userId}:
 *  get:
 *     tags: [Users]
 *     description: Follow user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Set user Id
 *         required: true
 *     responses:
 *       200:
 *         description: Follow user successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/users/unfollow/{userId}:
 *  get:
 *     tags: [Users]
 *     description: UnFollow user
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Set user Id
 *         required: true
 *     responses:
 *       200:
 *         description: UnFollow user successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/follow/:userId').get(userController.followUser)
router.route('/unfollow/:userId').get(userController.unfollowUser)

export default router
