import { commonController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.use(authMiddleware.getUser)

router.route('/nums').get(commonController.statisticalNumsDashboard)

export default router
