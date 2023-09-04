"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchHistory_controller_1 = require("../controllers/searchHistory.controller");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: SearchHistory
 *   description: The search history managing API
 */
router.use(middlewares_1.authMiddleware.getUser);
/**
 * @openapi
 * /api/v1/search-history:
 *  post:
 *     tags: [SearchHistory]
 *     description: Create search history
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserSearchHistory'
 *     responses:
 *       201:
 *         description: Create search history successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/').post(searchHistory_controller_1.searchHistoryController.createSearchHistory);
exports.default = router;
