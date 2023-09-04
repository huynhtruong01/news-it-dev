"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyController = void 0;
const enums_1 = require("../enums");
const services_1 = require("../services");
const server_1 = require("../server");
const config_1 = require("../config");
class NotifyController {
    // get all no conditions (GET)
    getAllNotifiesNoConditions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [notifies, count] = yield services_1.notifyService.getAllNoConditions();
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        notifies,
                        total: count,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // get all notifies (GET)
    getAllNotifies(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                    const [notifies, count] = yield services_1.notifyService.getAll(Number(req.user.id), req.query);
                    res.status(enums_1.StatusCode.SUCCESS).json({
                        results: enums_1.Results.SUCCESS,
                        status: enums_1.StatusText.SUCCESS,
                        data: {
                            notifies,
                            total: count,
                        },
                    });
                }
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // create notify (POST)
    createNotify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield services_1.notifyService.create(req.body);
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        notify,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // create multi notify in comment mentions
    createNotifyForComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield services_1.notifyService.createMultiForComment(req.body, req.body.users);
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        notify,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // notify new news
    newNewsNotify(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { notify, news } = req.body;
                const user = (yield services_1.userService.getById(Number(notify.userId)));
                if (news.status === enums_1.NewsStatus.PUBLIC &&
                    user.followers.length > 0) {
                    const newNotify = yield services_1.notifyService.create(req.body.notify);
                    if (newNotify) {
                        for (const u of user.followers || []) {
                            server_1.io.to(u.id.toString()).emit('notifyNews', newNotify);
                        }
                    }
                    const emails = (_a = user.followers) === null || _a === void 0 ? void 0 : _a.map((u) => u.emailAddress);
                    const url = `${process.env.HOST_FRONTEND}/news/${news.slug}`;
                    yield (0, config_1.sendEmail)(emails, url, 'Đọc bài viết mới', `Bạn đã có bài viết đến từ ${(_b = newNotify.user) === null || _b === void 0 ? void 0 : _b.username}. Hãy nhấn nút bên dưới hoặc nhấn đường link để xem bài viết`);
                }
                res.status(enums_1.StatusCode.DELETED).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    data: null,
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // create comment notify
    createCommentNotify(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = {
                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                    newsId: req.body.news.id,
                    user: req.user,
                    news: req.body.news,
                    text: 'has been commented your news',
                    recipients: [req.body.news.user],
                    readUsers: [],
                    type: enums_1.NotifyType.COMMENT,
                };
                const newNotify = yield services_1.notifyService.create(notify);
                server_1.io.to(req.body.news.user.id.toString()).emit('notifyNews', newNotify);
                res.status(enums_1.StatusCode.DELETED).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    data: null,
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // like news notify
    likeNewsNotify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield services_1.notifyService.create(req.body);
                const news = yield services_1.newsService.getByIdComment(req.body.newsId);
                if (news) {
                    notify.news = news;
                }
                for (const user of req.body.recipients) {
                    server_1.io.to(user.id.toString()).emit('notifyNews', notify);
                }
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        notify,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // follow
    followNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield services_1.notifyService.create(req.body);
                for (const user of req.body.recipients) {
                    server_1.io.to(user.id.toString()).emit('notifyNews', notify);
                }
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        notify,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // update read users (GET)
    readUsersNotify(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield services_1.notifyService.readUsers(Number(req.params.notifyId), Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        notify,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // reply comment
    replyCommentNotify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield services_1.newsService.getByIdComment(Number(req.body.newsId));
                req.body.news = news;
                const notify = yield services_1.notifyService.create(req.body);
                for (const user of req.body.recipients) {
                    server_1.io.to(user.id.toString()).emit('notifyNews', notify);
                }
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        notify,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // delete by news id (DELETE)
    deleteNotifyByNewsId(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield services_1.notifyService.delete(Number(req.params.notifyId), Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                if (!notify) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found notify by news id to delete.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.DELETED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: null,
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    deleteAllNotify(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield services_1.notifyService.deleteAll((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        message: 'Delete many notify success',
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
}
exports.notifyController = new NotifyController();
