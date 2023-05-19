import { commentController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.use(authMiddleware.getUser)

router
    .route('/')
    .get(commentController.getAllComments)
    .post(commentController.createComment)

router
    .route('/:commentId')
    .put(commentController.updateComment)
    .delete(commentController.deleteComment)

router.route('/reply').post(commentController.replyComment)
router.route('/reply/:commentId').put(commentController.updateReplyComment)

router.route('/like/:commentId').get(commentController.likeComment)
router.route('/unlike/:commentId').get(commentController.unlikeComment)

export default router
