import { newsController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.get('/tagIds', authMiddleware.getUser, newsController.getNewsByHashTagIds)

router.route('/').get(newsController.getAllNews)
router.route('/get-all-public').get(newsController.getAllNewsPublic)

router
    .route('/:newsId')
    .get(newsController.getNews)
    .put(newsController.updateNews)
    .delete(newsController.deleteNews)

router.route('/detail/:newsSlug').get(newsController.getNewsBySlug)

router.route('/count-views/:newsId').get(newsController.countViewsNews)

router.use(authMiddleware.getUser)

router.route('/').post(newsController.createNews)
router.route('/like/:newsId').get(newsController.likeNews)
router.route('/unlike/:newsId').get(newsController.dislikeNews)

router.route('/save/:newsId').get(newsController.saveNews)
router.route('/unsave/:newsId').get(newsController.unsaveNews)

export default router
