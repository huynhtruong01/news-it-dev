import {
    Comment,
    HashTag,
    News,
    Notify,
    Report,
    Role,
    User,
    UserFollow,
    UserLike,
    UserSave,
    UserSearchHistory,
} from '@/entities'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config({
    path: './.env',
})

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // host: '127.0.0.1',
    // port: 3306,
    // username: 'root',
    // password: '',
    // database: 'news_app',
    entities: [
        User,
        News,
        HashTag,
        Role,
        Comment,
        Notify,
        UserSearchHistory,
        UserFollow,
        UserLike,
        UserSave,
        Report,
    ],
    // url: process.env.DB_URL,
    synchronize: true,
})
