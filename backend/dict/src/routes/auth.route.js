"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
const router = express_1.default.Router();
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
router.route('/verify').get(controllers_1.authController.verifyUser);
router.route('/signup').post(controllers_1.authController.signup);
router.route('/login').post(controllers_1.authController.login);
router.route('/logout').get(controllers_1.authController.logout);
router.route('/refresh-token').post(controllers_1.authController.refreshToken);
router.route('/reset-password').post(controllers_1.authController.resetPassword);
router.route('/check-email').post(controllers_1.authController.checkEmail);
router.route('/active-user').post(controllers_1.authController.activeUser);
router.route('/google-login').post(controllers_1.authController.googleLogin);
router.route('/facebook-login').post(controllers_1.authController.facebookLogin);
router.route('/confirm-email').post(controllers_1.authController.confirmEmail);
router.route('/forgot-password').post(controllers_1.authController.forgotPassword);
router.use(middlewares_1.authMiddleware.rolePermission);
router.route('/login-admin').post(controllers_1.authController.login);
// has user to check
router.use(middlewares_1.authMiddleware.getUser);
router.route('/delete-me').delete(controllers_1.authController.deleteMe);
exports.default = router;
