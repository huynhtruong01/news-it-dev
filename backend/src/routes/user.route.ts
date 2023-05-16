import { userController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.route('/name/:userName').get(userController.getUserByUsername)

router.use(authMiddleware.getUser)

router
    .route('/profile')
    .get(userController.getProfile)
    .put(userController.updateProfileUser)

router.route('/').get(userController.getAllUser).post(userController.addUser)
router.route('/profile/:userId').get(userController.getProfileSaveFilters)

router
    .route('/:userId')
    .get(userController.getUser)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)

router.route('/follow/:userId').get(userController.followUser)
router.route('/unfollow/:userId').get(userController.unfollowUser)

export default router
