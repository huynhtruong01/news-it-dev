import { newsController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: News
 *   description: The news managing API
 */

/**
 * @openapi
 * /api/v1/news/search-queries:
 *  get:
 *     tags: [News]
 *     description: Search news by title
 *     responses:
 *       200:
 *         description: Get all news public successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

router.get(
    '/search-queries',
    authMiddleware.getUser,
    newsController.getAllNewsByQueriesSearch
)

/**
 * @openapi
 * /api/v1/news/get-all-public:
 *  get:
 *     tags: [News]
 *     description: List news public
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Set page for news
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 5
 *         description: Set limit for each page news
 *     responses:
 *       200:
 *         description: Get all news public successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/get-all-public').get(newsController.getAllNewsPublic)

/**
 * @openapi
 * /api/v1/news/recommend-news:
 *  post:
 *     tags: [News]
 *     description: List news recommend public
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      newsId:
 *                          type: integer
 *                          default: 25
 *                      hashTag:
 *                          type: string
 *                          default: 1,2,3
 *                  required:
 *                      - newsId
 *     responses:
 *       200:
 *         description: Get all news recommend public successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.post('/recommend-news', newsController.getNewsRecommend)

/**
 * @openapi
 * /api/v1/news:
 *  get:
 *     tags: [News]
 *     description: List news
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Set page for news
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 5
 *         description: Set limit for each page news
 *     responses:
 *       200:
 *         description: Get all news successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/').get(newsController.getAllNews)

/**
 * @openapi
 * /api/v1/news/{newsId}:
 *  get:
 *     tags: [News]
 *     description: Get news
 *     parameters:
 *       - in: path
 *         name: newsId
 *         schema:
 *           type: integer
 *         description: Set news Id
 *         required: true
 *     responses:
 *       200:
 *         description: Get news by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/news/{newsId}:
 *  put:
 *     tags: [News]
 *     description: Update news
 *     parameters:
 *       - in: path
 *         name: newsId
 *         schema:
 *           type: integer
 *         description: Set news Id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                          default: Update news
 *                      sapo:
 *                          type: string
 *                          default: Update sapo news
 *                      description:
 *                          type: string
 *                          default: Update description news
 *     responses:
 *       200:
 *         description: Get news by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/:newsId').get(newsController.getNews).put(newsController.updateNews)

/**
 * @openapi
 * /api/v1/news/detail/{newsSlug}:
 *  get:
 *     tags: [News]
 *     description: Get news detail
 *     parameters:
 *       - in: path
 *         name: newsSlug
 *         schema:
 *           type: string
 *         description: Set news Slug
 *         required: true
 *     responses:
 *       200:
 *         description: Get news by Slug successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/detail/:newsSlug').get(newsController.getNewsBySlug)

/**
 * @openapi
 * /api/v1/news/count-views/{newsId}:
 *  get:
 *     tags: [News]
 *     description: Count news view
 *     parameters:
 *       - in: path
 *         name: newsId
 *         schema:
 *           type: integer
 *         description: Set news Id
 *         required: true
 *     responses:
 *       200:
 *         description: Count successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/count-views/:newsId').get(newsController.countViewsNews)

router.use(authMiddleware.getUser)

/**
 * @openapi
 * /api/v1/news/{newsId}:
 *  delete:
 *     tags: [News]
 *     description: Delete news by Id
 *     parameters:
 *       - in: path
 *         name: newsId
 *         schema:
 *           type: integer
 *         description: Set news Id
 *         required: true
 *     responses:
 *       204:
 *         description: Delete news successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/:newsId').delete(newsController.deleteNews)

/**
 * @openapi
 * /api/v1/news:
 *  post:
 *     tags: [News]
 *     description: Create news
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: Create news successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/').post(newsController.createNews)

/**
 * @openapi
 * /api/v1/news/like/{newsId}:
 *  get:
 *     tags: [News]
 *     description: Like news
 *     parameters:
 *       - in: path
 *         name: newsId
 *         schema:
 *           type: integer
 *         description: Set news Id
 *         required: true
 *     responses:
 *       200:
 *         description: Like news successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/like/:newsId').get(newsController.likeNews)

/**
 * @openapi
 * /api/v1/news/unlike/{newsId}:
 *  get:
 *     tags: [News]
 *     description: UnLike news
 *     parameters:
 *       - in: path
 *         name: newsId
 *         schema:
 *           type: integer
 *         description: Set news Id
 *         required: true
 *     responses:
 *       200:
 *         description: UnLike news successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/unlike/:newsId').get(newsController.dislikeNews)

/**
 * @openapi
 * /api/v1/news/save/{newsId}:
 *  get:
 *     tags: [News]
 *     description: Save news
 *     parameters:
 *       - in: path
 *         name: newsId
 *         schema:
 *           type: integer
 *         description: Set news Id
 *         required: true
 *     responses:
 *       200:
 *         description: Save news successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/save/:newsId').get(newsController.saveNews)

/**
 * @openapi
 * /api/v1/news/unsave/{newsId}:
 *  get:
 *     tags: [News]
 *     description: UnSave news
 *     parameters:
 *       - in: path
 *         name: newsId
 *         schema:
 *           type: integer
 *         description: Set news Id
 *         required: true
 *     responses:
 *       200:
 *         description: UnSave news successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/unsave/:newsId').get(newsController.unsaveNews)

export default router
