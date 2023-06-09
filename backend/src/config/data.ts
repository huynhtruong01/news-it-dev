import { Comment, HashTag, News, Notify, Role, User } from '@/entities'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'mysql',
    // host: process.env.DB_HOST,
    host: 'bp13jgttxy88d3zkucci-mysql.services.clever-cloud.com',
    // port: Number(process.env.DB_PORT),
    port: 3306,
    // username: process.env.DB_USERNAME,
    username: 'uqnlu0eccxx3rwvf',
    // password: process.env.DB_PASSWORD,
    password: '9s6AogrYrj2oT8mggG8I',
    // database: process.env.DB_NAME,
    database: 'bp13jgttxy88d3zkucci',
    entities: [User, News, HashTag, Role, Comment, Notify],
    synchronize: true,
})
