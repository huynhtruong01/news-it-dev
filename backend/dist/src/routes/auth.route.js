"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
// has user to check
router.use(middlewares_1.authMiddleware.getUser);
router.route('/delete-me').delete(controllers_1.authController.deleteMe);
exports.default = router;
