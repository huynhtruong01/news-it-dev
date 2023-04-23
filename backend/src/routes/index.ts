import express from 'express'
import userRouter from '@/routes/user.route'
const router = express.Router()

const routes = [router.use('/users', userRouter)]

export default routes
