"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/get-all').get(controllers_1.hashTagController.getAll);
router
    .route('/')
    .get(controllers_1.hashTagController.getAllHashTag)
    .post(controllers_1.hashTagController.createHashTag);
router.route('/name/:hashTagName').get(controllers_1.hashTagController.getHashTagByName);
router
    .route('/:hashTagId')
    .get(controllers_1.hashTagController.getHashTag)
    .put(controllers_1.hashTagController.updateHashTag)
    .delete(controllers_1.hashTagController.deleteHashTag);
router.use(middlewares_1.authMiddleware.getUser);
router.route('/follow/:hashTagId').get(controllers_1.hashTagController.followHashTag);
router.route('/unfollow/:hashTagId').get(controllers_1.hashTagController.unFollowHashTag);
exports.default = router;
