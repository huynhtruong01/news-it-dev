import express from 'express'
import userRouter from '@/routes/user.route'
import authRouter from '@/routes/auth.route'
import roleRouter from '@/routes/role.route'
import hashTagRouter from '@/routes/hashTag.route'
import newsRouter from '@/routes/news.route'
import commentRouter from '@/routes/comment.route'
const router = express.Router()

const routes = [
    router.use('/users', userRouter),
    router.use('/auth', authRouter),
    router.use('/roles', roleRouter),
    router.use('/hash-tags', hashTagRouter),
    router.use('/news', newsRouter),
    router.use('/comments', commentRouter),
]

export default routes
