"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comment managing API
 */
router.use(middlewares_1.authMiddleware.getUser);
/**
 * @openapi
 * /api/v1/comments:
 *  get:
 *     tags: [Comments]
 *     description: Get all comments by userId
 *     responses:
 *       200:
 *         description: Get all comments by userId successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
/**
 * @openapi
 * /api/v1/comments:
 *  post:
 *     tags: [Comments]
 *     description: Create comment
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Create comment successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
/**
 * @openapi
 * /api/v1/comments/{commentId}:
 *  put:
 *     tags: [Comments]
 *     description: Update comment by Id
 *     parameters:
 *          - in: path
 *            name: commentId
 *            required: true
 *            description: Set comment by Id
 *            schema:
 *                type: integer
 *     responses:
 *       200:
 *         description: Update comment by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
/**
 * @openapi
 * /api/v1/comments/{commentId}:
 *  delete:
 *     tags: [Comments]
 *     description: Delete comment by Id
 *     parameters:
 *          - in: path
 *            name: commentId
 *            required: true
 *            description: Set comment by Id
 *            schema:
 *                type: integer
 *     responses:
 *       200:
 *         description: Delete comment by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
/**
 * @openapi
 * /api/v1/comments/reply:
 *  post:
 *     tags: [Comments]
 *     description: Create reply comment
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Create reply comment successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
/**
 * @openapi
 * /api/v1/comments/reply/{commentId}:
 *  put:
 *     tags: [Comments]
 *     description: Update reply comment
 *     parameters:
 *          - in: path
 *            name: commentId
 *            schema:
 *              type: integer
 *            description: Set comment Id
 *            required: true
 *     responses:
 *       200:
 *         description: Update reply comment successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
/**
 * @openapi
 * /api/v1/comments/like/{commentId}:
 *  get:
 *     tags: [Comments]
 *     description: Like comment
 *     parameters:
 *          - in: path
 *            name: commentId
 *            schema:
 *              type: integer
 *            description: Set comment Id
 *            required: true
 *     responses:
 *       200:
 *         description: Like comment successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
/**
 * @openapi
 * /api/v1/comments/unlike/{commentId}:
 *  get:
 *     tags: [Comments]
 *     description: UnLike comment
 *     parameters:
 *          - in: path
 *            name: commentId
 *            schema:
 *              type: integer
 *            description: Set comment Id
 *            required: true
 *     responses:
 *       200:
 *         description: UnLike comment successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
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
