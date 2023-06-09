"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(middlewares_1.authMiddleware.getUser);
router.route('/get-all').get(controllers_1.notifyController.getAllNotifiesNoConditions);
router.route('/multiple').post(controllers_1.notifyController.createNotifyForComment);
router.route('/follow').post(controllers_1.notifyController.followNews);
router.route('/like').post(controllers_1.notifyController.likeNewsNotify);
router.route('/read-users/:notifyId').get(controllers_1.notifyController.readUsersNotify);
router.route('/').get(controllers_1.notifyController.getAllNotifies).post(controllers_1.notifyController.createNotify);
router.route('/:notifyId').delete(controllers_1.notifyController.deleteNotifyByNewsId);
exports.default = router;
