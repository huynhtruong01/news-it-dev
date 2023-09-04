import { roleController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: The role managing API
 */

router.route('/').post(roleController.createRole)
router.use(authMiddleware.getUser, authMiddleware.rolePermission)

/**
 * @openapi
 * /api/v1/roles:
 *  get:
 *     tags: [Roles]
 *     description: Get all roles
 *     responses:
 *       200:
 *         description: Get all roles successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/roles:
 *  post:
 *     tags: [Roles]
 *     description: Create role
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Create role successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/roles/{roleId}:
 *  get:
 *     tags: [Roles]
 *     description: Get role by Id
 *     parameters:
 *         - in: path
 *           required: true
 *           schema:
 *              type: integer
 *           description: Set role Id
 *           name: roleId
 *     responses:
 *       200:
 *         description: Get role by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/roles/{roleId}:
 *  put:
 *     tags: [Roles]
 *     description: Update role by Id
 *     parameters:
 *         - in: path
 *           required: true
 *           schema:
 *              type: integer
 *           description: Set role Id
 *           name: roleId
 *     responses:
 *       200:
 *         description: Update role by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

/**
 * @openapi
 * /api/v1/roles/{roleId}:
 *  delete:
 *     tags: [Roles]
 *     description: Delete role by Id
 *     parameters:
 *         - in: path
 *           required: true
 *           schema:
 *              type: integer
 *           description: Set role Id
 *           name: roleId
 *     responses:
 *       200:
 *         description: Delete role by Id successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */

router.route('/get-all').get(roleController.getAll)
router.route('/').get(roleController.getAllRoles)
router
    .route('/:roleId')
    .get(roleController.getRole)
    .put(roleController.updateRole)
    .delete(roleController.deleteRole)

export default router
