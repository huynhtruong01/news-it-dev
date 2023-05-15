import { hashTagController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.route('/get-all').get(hashTagController.getAll)

router
    .route('/')
    .get(hashTagController.getAllHashTag)
    .post(hashTagController.createHashTag)

router.route('/slug/:hashTagSlug').get(hashTagController.getHashTagBySlug)

router
    .route('/:hashTagId')
    .get(hashTagController.getHashTag)
    .put(hashTagController.updateHashTag)
    .delete(hashTagController.deleteHashTag)

router.use(authMiddleware.getUser)

router.route('/follow/:hashTagId').get(hashTagController.followHashTag)
router.route('/unfollow/:hashTagId').get(hashTagController.unFollowHashTag)

export default router
