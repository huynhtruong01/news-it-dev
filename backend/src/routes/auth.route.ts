import { authController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'

const router = express.Router()

router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout)
router.route('/refresh-token').get(authController.refreshToken)
router.route('/reset-password').post(authController.resetPassword)
router.route('/check-email').post(authController.checkEmail)

// has user to check
router.use(authMiddleware.getUser)

router.route('/delete-your-self').delete(authController.deleteYourSelf)

export default router
