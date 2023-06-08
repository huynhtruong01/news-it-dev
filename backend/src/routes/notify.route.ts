import { notifyController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.use(authMiddleware.getUser)

router.route('/get-all').get(notifyController.getAllNotifiesNoConditions)
router.route('/multiple').post(notifyController.createNotifyForComment)
router.route('/follow').post(notifyController.followNews)
router.route('/like').post(notifyController.likeNewsNotify)
router.route('/read-users/:notifyId').get(notifyController.readUsersNotify)
router.route('/').get(notifyController.getAllNotifies).post(notifyController.createNotify)
router.route('/:notifyId').delete(notifyController.deleteNotifyByNewsId)

export default router
