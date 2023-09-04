"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const role_route_1 = __importDefault(require("../routes/role.route"));
const hashTag_route_1 = __importDefault(require("../routes/hashTag.route"));
const news_route_1 = __importDefault(require("../routes/news.route"));
const comment_route_1 = __importDefault(require("../routes/comment.route"));
const notify_route_1 = __importDefault(require("../routes/notify.route"));
const common_route_1 = __importDefault(require("../routes/common.route"));
const searchHistory_route_1 = __importDefault(require("../routes/searchHistory.route"));
const report_route_1 = __importDefault(require("../routes/report.route"));
const router = express_1.default.Router();
const routes = [
    router.use('/statistical', common_route_1.default),
    router.use('/users', user_route_1.default),
    router.use('/auth', auth_route_1.default),
    router.use('/roles', role_route_1.default),
    router.use('/hash-tags', hashTag_route_1.default),
    router.use('/comments', comment_route_1.default),
    router.use('/news', news_route_1.default),
    router.use('/notifies', notify_route_1.default),
    router.use('/search-history', searchHistory_route_1.default),
    router.use('/reports', report_route_1.default),
];
exports.default = routes;
