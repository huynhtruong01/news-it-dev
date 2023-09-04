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
 *   name: Roles
 *   description: The role managing API
 */
router.use(middlewares_1.authMiddleware.getUser, middlewares_1.authMiddleware.rolePermission);
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
router.route('/get-all').get(controllers_1.roleController.getAll);
router.route('/').get(controllers_1.roleController.getAllRoles).post(controllers_1.roleController.createRole);
router
    .route('/:roleId')
    .get(controllers_1.roleController.getRole)
    .put(controllers_1.roleController.updateRole)
    .delete(controllers_1.roleController.deleteRole);
exports.default = router;
