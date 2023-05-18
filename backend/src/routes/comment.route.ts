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

export default router
