import { Comment, HashTag, News, Notify, Role, User } from '@/entities'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'news_app',
    entities: [User, News, HashTag, Role, Comment, Notify],
    synchronize: true,
})
