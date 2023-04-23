import { userController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.use(authMiddleware.getUser)

router.route('/:userId').delete(userController.deleteUser)
router.route('/').get(userController.getAllUser)

export default router
