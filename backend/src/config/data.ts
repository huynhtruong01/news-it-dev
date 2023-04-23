import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'mysql',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [],
    synchronize: true,
})
