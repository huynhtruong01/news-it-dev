import { hashTagController } from '@/controllers'
import express from 'express'
const router = express.Router()

router
    .route('/')
    .get(hashTagController.getAllHashTag)
    .post(hashTagController.createHashTag)
router
    .route('/:hashTagId')
    .get(hashTagController.getHashTag)
    .put(hashTagController.updateHashTag)
    .delete(hashTagController.deleteHashTag)

export default router
