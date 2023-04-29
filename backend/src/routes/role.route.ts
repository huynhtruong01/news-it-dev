import { roleController } from '@/controllers'
import { authMiddleware } from '@/middlewares'
import express from 'express'
const router = express.Router()

router.use(authMiddleware.getUser)

router.route('/').get(roleController.getAllRoles).post(roleController.createRole)
router
    .route('/:roleId')
    .get(roleController.getRole)
    .put(roleController.updateRole)
    .delete(roleController.deleteRole)

export default router
