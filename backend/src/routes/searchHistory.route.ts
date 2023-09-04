import { searchHistoryController } from '@/controllers/searchHistory.controller'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: SearchHistory
 *   description: The search history managing API
 */

router.use(authMiddleware.getUser)
/**
 * @openapi
 * /api/v1/search-history:
 *  post:
 *     tags: [SearchHistory]
 *     description: Create search history
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserSearchHistory'
 *     responses:
 *       201:
 *         description: Create search history successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/').post(searchHistoryController.createSearchHistory)

export default router
