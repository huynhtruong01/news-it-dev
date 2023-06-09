"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/name/:userName').get(controllers_1.userController.getUserByUsername);
router.use(middlewares_1.authMiddleware.getUser);
router
    .route('/profile')
    .get(controllers_1.userController.getProfile)
    .put(controllers_1.userController.updateProfileUser);
router.route('/').get(controllers_1.userController.getAllUser).post(controllers_1.userController.addUser);
router.route('/profile/:userId').get(controllers_1.userController.getProfileSaveFilters);
router
    .route('/:userId')
    .get(controllers_1.userController.getUser)
    .put(controllers_1.userController.updateUserById)
    .delete(controllers_1.userController.deleteUserById);
router.route('/follow/:userId').get(controllers_1.userController.followUser);
router.route('/unfollow/:userId').get(controllers_1.userController.unfollowUser);
exports.default = router;
