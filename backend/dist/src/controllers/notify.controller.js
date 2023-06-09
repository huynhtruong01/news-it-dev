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
const server_1 = require("../../server");
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
}
exports.notifyController = new NotifyController();
