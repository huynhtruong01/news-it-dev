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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsController = void 0;
const enums_1 = require("../enums");
const services_1 = require("../services");
// ---------------- CHECK -------------------------
const checkNewsId = (newsId, res) => {
    if (!newsId) {
        res.status(enums_1.StatusCode.BAD_REQUEST).json({
            results: enums_1.Results.ERROR,
            status: enums_1.StatusText.FAILED,
            message: 'Unauthorized or missing news id.',
        });
        return false;
    }
    return true;
};
class NewsController {
    // get all news public (GET)
    getAllNewsPublic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.query, { userId } = _a, rest = __rest(_a, ["userId"]);
                const [news, count] = yield services_1.newsService.getAllByConditional(rest, userId);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
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
    getAllNewsByQueriesSearch(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [news, count] = yield services_1.newsService.getAllBySearchQueries(Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
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
    // get all news (GET)
    getAllNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const [news, count] = yield services_1.newsService.getAll(query);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
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
    // get news recommend
    getNewsRecommend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.body;
                const news = yield services_1.newsService.getAllByRecommend(query);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
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
    // get news by /detail/:slug (GET)
    getNewsBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield services_1.newsService.getBySlug(req.params.newsSlug);
                if (!news) {
                    res.status(enums_1.StatusCode.ERROR).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.ERROR,
                        message: 'Not found this news by slug.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
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
    // get by :id (GET)
    getNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield services_1.newsService.getById(Number(req.params.newsId));
                if (!news) {
                    res.status(enums_1.StatusCode.ERROR).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.ERROR,
                        message: 'Not found this news by id.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
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
    // create (POST)
    createNews(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check hash tag ids
                // const checkHashTags = hashTagService.checkHashTagIds(req.body.hashTagIds)
                // if (!checkHashTags) {
                //     res.status(StatusCode.BAD_REQUEST).json({
                //         results: Results.ERROR,
                //         status: StatusText.FAILED,
                //         message: 'Missing hash tags or invalid type.',
                //     })
                //     return
                // }
                // count news
                // await userService.countNews(req.user as User)
                // create news
                const newNews = yield services_1.newsService.create(Object.assign(Object.assign({}, req.body), { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }));
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news: newNews,
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
    // update (PUT)
    updateNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNews = yield services_1.newsService.update(Number(req.params.newsId), req.body);
                if (!newNews) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this news to update.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news: newNews,
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
    // delete (DELETE)
    deleteNews(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield services_1.newsService.delete(Number(req.params.newsId), Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                if (!news) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this news to delete.',
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
    // count news view when user access that news (GET)
    countViewsNews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.newsId) {
                    const news = yield services_1.newsService.countViews(Number(req.params.newsId));
                    res.status(enums_1.StatusCode.SUCCESS).json({
                        results: enums_1.Results.SUCCESS,
                        status: enums_1.StatusText.SUCCESS,
                        data: {
                            news,
                        },
                    });
                    return;
                }
                res.status(enums_1.StatusCode.NOT_FOUND).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.FAILED,
                    message: 'Not found this news to count views.',
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
    // TODO: likes news (GET)
    likeNews(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newsId } = req.params;
                // check has userId, newsId
                if (!checkNewsId(Number(newsId), res) || !((_a = req.user) === null || _a === void 0 ? void 0 : _a.id))
                    return;
                // get user, check and push user to likes
                const news = yield services_1.newsService.like(Number(newsId), req.user);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
                        message: `Like '${news === null || news === void 0 ? void 0 : news.title}' news success.`,
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
    // TODO: dislike news (GET)
    dislikeNews(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newsId } = req.params;
                if (!checkNewsId(Number(newsId), res) || !((_a = req.user) === null || _a === void 0 ? void 0 : _a.id))
                    return;
                const news = yield services_1.newsService.unlike(Number(newsId), req.user);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
                        message: `Unlike '${news === null || news === void 0 ? void 0 : news.title}' news success.`,
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
    // TODO: save news (GET)
    saveNews(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newsId } = req.params;
                if (!checkNewsId(Number(newsId), res) || !((_a = req.user) === null || _a === void 0 ? void 0 : _a.id))
                    return;
                const news = yield services_1.newsService.save(Number(newsId), req.user);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
                        message: `Save '${news === null || news === void 0 ? void 0 : news.title}' news success.`,
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
    // TODO: unsave news (GET)
    unsaveNews(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newsId } = req.params;
                if (!checkNewsId(Number(newsId), res) || !((_a = req.user) === null || _a === void 0 ? void 0 : _a.id))
                    return;
                const news = yield services_1.newsService.unsave(Number(newsId), req.user);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        news,
                        message: `Unsave '${news === null || news === void 0 ? void 0 : news.title}' news success.`,
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
exports.newsController = new NewsController();
