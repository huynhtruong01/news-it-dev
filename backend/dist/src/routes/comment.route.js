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
router
    .route('/')
    .get(controllers_1.commentController.getAllComments)
    .post(controllers_1.commentController.createComment);
router
    .route('/:commentId')
    .put(controllers_1.commentController.updateComment)
    .delete(controllers_1.commentController.deleteComment);
router.route('/reply').post(controllers_1.commentController.replyComment);
router.route('/reply/:commentId').put(controllers_1.commentController.updateReplyComment);
router.route('/like/:commentId').get(controllers_1.commentController.likeComment);
router.route('/unlike/:commentId').get(controllers_1.commentController.unlikeComment);
exports.default = router;
