"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'news_app',
    entities: [entities_1.User, entities_1.News, entities_1.HashTag, entities_1.Role, entities_1.Comment, entities_1.Notify],
    synchronize: true,
});
