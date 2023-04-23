import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { AppDataSource } from '@/config'
import routes from '@/routes'
const app = express()
dotenv.config({
    path: './.env',
})

AppDataSource.initialize().then(() => {
    console.log('Connect DB successfully.')

    app.use(express.json())
    app.use(cookieParser())
    app.use(express.urlencoded({ extended: true }))
    app.use(morgan('dev'))
    app.use(cors())

    app.use('/api/v1', routes)

    const port = process.env.PORT
    app.listen(port, () => {
        console.log(`Server is running, port ${port}`)
    })
})
