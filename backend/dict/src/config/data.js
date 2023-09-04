"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const entities_1 = require("../entities");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: './.env',
});
exports.AppDataSource = new typeorm_1.DataSource({
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
        entities_1.User,
        entities_1.News,
        entities_1.HashTag,
        entities_1.Role,
        entities_1.Comment,
        entities_1.Notify,
        entities_1.UserSearchHistory,
        entities_1.UserFollow,
        entities_1.UserLike,
        entities_1.UserSave,
        entities_1.Report,
    ],
    // url: process.env.DB_URL,
    synchronize: true,
});
