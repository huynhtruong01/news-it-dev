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
 *   name: Reports
 *   description: The report managing API
 */
router.use(middlewares_1.authMiddleware.getUser, middlewares_1.authMiddleware.rolePermission);
/**
 * @openapi
 * /api/v1/reports:
 *  get:
 *     tags: [Reports]
 *     description: Get all reports
 *     responses:
 *       200:
 *         description: Get all reports successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
/**
 * @openapi
 * /api/v1/reports:
 *  post:
 *     tags: [Reports]
 *     description: Create report
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Report'
 *     responses:
 *       200:
 *         description: Create report successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
/**
 * @openapi
 * /api/v1/reports/{reportId}:
 *  delete:
 *     tags: [Reports]
 *     description: Delete report
 *     parameters:
 *         - in: path
 *           required: true
 *           schema:
 *              type: integer
 *           description: Set report Id
 *           name: reportId
 *     responses:
 *       200:
 *         description: Delete report successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.route('/').get(controllers_1.reportController.getAllReports).post(controllers_1.reportController.createReport);
router.route('/:reportId').delete(controllers_1.reportController.deleteReport);
exports.default = router;
