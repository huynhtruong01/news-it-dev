import { authController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'

const router = express.Router()

router.route('/verify').get(authController.verifyUser)
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)
router.route('/logout').get(authController.logout)
router.route('/refresh-token').post(authController.refreshToken)
router.route('/reset-password').post(authController.resetPassword)
router.route('/check-email').post(authController.checkEmail)
router.route('/active-user').post(authController.activeUser)
router.route('/google-login').post(authController.googleLogin)
router.route('/facebook-login').post(authController.facebookLogin)
router.route('/confirm-email').post(authController.confirmEmail)
router.route('/forgot-password').post(authController.forgotPassword)

// has user to check
router.use(authMiddleware.getUser)

router.route('/delete-me').delete(authController.deleteMe)

export default router
