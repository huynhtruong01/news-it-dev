"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const config_2 = require("./config");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
dotenv_1.default.config({
    path: './.env',
});
const http = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(http, {
    cors: {
        origin: [
            process.env.HOST_FRONTEND,
            process.env.HOST_MAIN_NEWS,
            process.env.HOST_DASHBOARD_NEWS,
        ],
        credentials: true,
    },
});
exports.io.on('connection', (socket) => {
    console.log('socket: ', socket.id);
    (0, config_2.SocketServer)(socket);
});
config_1.AppDataSource.initialize().then(() => {
    console.log('Connect DB successfully.');
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cors_1.default)({
        origin: [
            process.env.HOST_DASHBOARD,
            process.env.HOST_FRONTEND,
            process.env.HOST_MAIN_NEWS,
            process.env.HOST_DASHBOARD_NEWS,
        ],
    }));
    app.use('/api/v1', routes_1.default);
    const port = Number(process.env.PORT);
    http.listen(port, () => {
        (0, utils_1.swaggerDocs)(app, port);
        console.log(`Server is running, port ${port}`);
    });
});
