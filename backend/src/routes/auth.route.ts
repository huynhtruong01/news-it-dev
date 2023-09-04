import { authController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

const router = express.Router()

/**
 * @openapi
 * /api/v1/auth/login:
 *  post:
 *     tags: [Auth]
 *     description: Login
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          emailAddress:
 *                              type: string
 *                          password:
 *                              type: string
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/auth/signup:
 *  post:
 *     tags: [Auth]
 *     description: Sign up
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          emailAddress:
 *                              type: string
 *                          password:
 *                              type: string
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          confirmPassword:
 *                              type: string
 *     responses:
 *       200:
 *         description: Sign up successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

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

router.use(authMiddleware.rolePermission)
router.route('/login-admin').post(authController.login)
// has user to check
router.use(authMiddleware.getUser)

router.route('/delete-me').delete(authController.deleteMe)

export default router
