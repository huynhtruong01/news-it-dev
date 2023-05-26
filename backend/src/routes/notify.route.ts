import { notifyController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.use(authMiddleware.getUser)

router.route('/read-users/:notifyId').get(notifyController.readUsersNotify)
router.route('/').get(notifyController.getAllNotifies).post(notifyController.createNotify)
router.route('/:newsId').delete(notifyController.deleteNotifyByNewsId)

export default router
