import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { AppDataSource } from '@/config'
import routes from '@/routes'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { SocketServer } from '@/config'
const app = express()
dotenv.config({
    path: './.env',
})

const http = createServer(app)
export const io = new Server(http, {
    cors: {
        origin: [
            process.env.HOST_FRONTEND as string,
            process.env.HOST_MAIN_NEWS as string,
            process.env.HOST_DASHBOARD_NEWS as string,
        ],
        credentials: true,
    },
})
io.on('connection', (socket: Socket) => {
    console.log('socket: ', socket.id)
    SocketServer(socket)
})

AppDataSource.initialize().then(() => {
    console.log('Connect DB successfully.')

    app.use(express.json({ limit: '10mb' }))
    app.use(cookieParser())
    app.use(express.urlencoded({ extended: true, limit: '10mb' }))
    app.use(morgan('dev'))
    app.use(cors())

    app.use('/api/v1', routes)

    const port = process.env.PORT
    http.listen(port, () => {
        console.log(`Server is running, port ${port}`)
    })
})
