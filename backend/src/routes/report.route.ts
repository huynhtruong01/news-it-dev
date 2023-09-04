import { reportController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: The report managing API
 */

router.use(authMiddleware.getUser, authMiddleware.rolePermission)

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

router.route('/').get(reportController.getAllReports).post(reportController.createReport)
router.route('/:reportId').delete(reportController.deleteReport)

export default router
