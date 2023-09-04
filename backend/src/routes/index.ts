import express from 'express'
import userRouter from '@/routes/user.route'
import authRouter from '@/routes/auth.route'
import roleRouter from '@/routes/role.route'
import hashTagRouter from '@/routes/hashTag.route'
import newsRouter from '@/routes/news.route'
import commentRouter from '@/routes/comment.route'
import notifyRouter from '@/routes/notify.route'
import commonRouter from '@/routes/common.route'
import searchHistoryRouter from '@/routes/searchHistory.route'
import reportRouter from '@/routes/report.route'
const router = express.Router()

const routes = [
    router.use('/statistical', commonRouter),
    router.use('/users', userRouter),
    router.use('/auth', authRouter),
    router.use('/roles', roleRouter),
    router.use('/hash-tags', hashTagRouter),
    router.use('/comments', commentRouter),
    router.use('/news', newsRouter),
    router.use('/notifies', notifyRouter),
    router.use('/search-history', searchHistoryRouter),
    router.use('/reports', reportRouter),
]

export default routes
