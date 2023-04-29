import { userController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.use(authMiddleware.getUser)

router.route('/').get(userController.getAllUser)
router
    .route('/:userId')
    .get(userController.getUser)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)

router.route('/follow/:userId').get(userController.followUser)
router.route('/unfollow/:userId').get(userController.unfollowUser)
export default router
