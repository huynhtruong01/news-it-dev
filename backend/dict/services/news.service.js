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
exports.newsService = void 0;
const config_1 = require("../config");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
const server_1 = require("../server");
const common_service_1 = require("../services/common.service");
const hashTag_service_1 = require("../services/hashTag.service");
const utils_1 = require("../utils");
const _1 = require(".");
class NewsService {
    constructor(newsRepository = config_1.AppDataSource.getRepository(entities_1.News), userRepository = config_1.AppDataSource.getRepository(entities_1.User), userLikeRepository = config_1.AppDataSource.getRepository(entities_1.UserLike), userSaveRepository = config_1.AppDataSource.getRepository(entities_1.UserSave)) {
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
        this.userLikeRepository = userLikeRepository;
        this.userSaveRepository = userSaveRepository;
    }
    // ------------------- CHECK ------------------------
    checkUserExitsInLikes(likes = [], userId) {
        const newLikeUserIds = likes.map((like) => like.id);
        return newLikeUserIds.includes(userId);
    }
    checkUserExitsInSaves(saves = [], userId) {
        const newLikeUserIds = saves.map((like) => like.id);
        return newLikeUserIds.includes(userId);
    }
    getAllByConditional(query, userId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pagination = (0, utils_1.paginationQuery)(query);
                const user = (yield this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.newsLikes', 'likes')
                    .leftJoinAndSelect('user.saves', 'saves')
                    .where('user.id = :userId', {
                    userId,
                })
                    .getOne());
                const likes = user
                    ? (_a = user.newsLikes) === null || _a === void 0 ? void 0 : _a.map((u) => {
                        if (u.newsId)
                            return u.newsId;
                        return 0;
                    })
                    : [];
                const saves = user
                    ? (_b = user.saves) === null || _b === void 0 ? void 0 : _b.map((u) => {
                        if (u.newsId)
                            return u.newsId;
                        return 0;
                    })
                    : [];
                const excludeIds = Array.from(new Set([...likes, ...saves]));
                if (query.hashTag || query.type === enums_1.NewsFilters.RELEVANT) {
                    const hashTagIds = query.hashTag
                        .split(',')
                        .map((h) => Number(h));
                    const queryBuilder = this.newsRepository
                        .createQueryBuilder('news')
                        .leftJoinAndSelect('news.user', 'user')
                        .leftJoinAndSelect('news.hashTags', 'hashTag')
                        .leftJoinAndSelect('news.likes', 'likes')
                        .leftJoinAndSelect('news.comments', 'comments')
                        .leftJoinAndSelect('news.saveUsers', 'saves');
                    if (excludeIds.length > 0) {
                        queryBuilder.where('news.id NOT IN (:...excludeIds)', {
                            excludeIds,
                        });
                    }
                    if (userId) {
                        const searchHistories = yield _1.searchHistoryService.getAllByUserId(Number(userId));
                        const searchQueries = searchHistories
                            .map((s) => s.searchQuery.toLowerCase().split(' '))
                            .flat();
                        const searchKeys = Array.from(new Set([...searchQueries]));
                        if (searchKeys.length > 0) {
                            const conditions = searchKeys
                                .filter((k) => !!k)
                                .map((k) => k.toLowerCase());
                            queryBuilder.andWhere(conditions
                                .map((key) => {
                                return key.split(' ').join('_');
                            })
                                .map((keyword) => {
                                return `LOWER(REPLACE(news.title, ".", "")) LIKE :${keyword}`;
                            })
                                .join(' OR '), conditions.reduce((params, keyword) => {
                                const key = keyword.split(' ').join('_');
                                return Object.assign(Object.assign({}, params), { [key]: `%${keyword.split('_').join(' ')}%` });
                            }, {}));
                        }
                    }
                    if (hashTagIds.length > 0) {
                        queryBuilder.where('hashTag.id IN (:...hashTagIds) AND news.id NOT IN (:...newsIds)', {
                            hashTagIds,
                            newsIds: excludeIds,
                        });
                    }
                    const [news, count] = yield queryBuilder
                        .andWhere('news.status = :status', {
                        status: enums_1.NewsStatus.PUBLIC,
                    })
                        .take(pagination.take)
                        .skip(pagination.skip)
                        .getManyAndCount();
                    return [news, count];
                }
                if (query.search && query.search.split(' ').length > 0) {
                    const conditions = query.search
                        .split(' ')
                        .filter((k) => !!k)
                        .map((k) => k.toLowerCase().split(' ').join('_'));
                    const queryBuilder = this.newsRepository
                        .createQueryBuilder('news')
                        .leftJoinAndSelect('news.user', 'user')
                        .leftJoinAndSelect('news.hashTags', 'hashTag')
                        .leftJoinAndSelect('news.likes', 'likes')
                        .leftJoinAndSelect('news.comments', 'comments')
                        .leftJoinAndSelect('news.saveUsers', 'saves')
                        .where('news.status = :status', {
                        status: enums_1.NewsStatus.PUBLIC,
                    });
                    if (excludeIds.length > 0) {
                        queryBuilder.andWhere('news.id NOT IN (:...excludeIds)', {
                            excludeIds,
                        });
                    }
                    if (query.numLikes) {
                        queryBuilder.orderBy('news.numLikes', enums_1.Status.DESC);
                    }
                    else {
                        queryBuilder.orderBy('news.createdAt', enums_1.Status.DESC);
                    }
                    const [news, count] = yield queryBuilder
                        .andWhere(conditions
                        .map((keyword) => {
                        return `LOWER(news.title) LIKE :${keyword}`;
                    })
                        .join(' OR '), conditions.reduce((params, keyword) => {
                        return Object.assign(Object.assign({}, params), { [keyword]: `%${keyword.split('_').join(' ')}%` });
                    }, {}))
                        .orderBy('news.numLikes', enums_1.Order.DESC)
                        .skip(pagination.skip)
                        .take(pagination.take)
                        .getManyAndCount();
                    return [news, count];
                }
                // const [news, count] = await this.getAll(query)
                const queryBuilder = this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('news.hashTags', 'hashTag')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('news.comments', 'comments')
                    .leftJoinAndSelect('news.saveUsers', 'saves')
                    .where('news.status = :status', {
                    status: enums_1.NewsStatus.PUBLIC,
                });
                if (excludeIds.length > 0) {
                    queryBuilder.andWhere('news.id NOT IN (:...excludeIds)', {
                        excludeIds,
                    });
                }
                if (query.numLikes) {
                    queryBuilder.orderBy('news.numLikes', enums_1.Order.DESC);
                }
                else {
                    queryBuilder.orderBy('news.createdAt', enums_1.Order.DESC);
                }
                const [news, count] = yield queryBuilder
                    .take(pagination.take)
                    .skip(pagination.skip)
                    .getManyAndCount();
                return [news, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // search by queries
    getAllBySearchQueries(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchHistories = yield _1.searchHistoryService.getAllByUserId(Number(userId));
                const getSearchQueries = searchHistories.map((s) => s.searchQuery);
                const conditions = getSearchQueries.map((k) => k.toLowerCase().split(' ').join('_'));
                const [news, count] = yield this.newsRepository
                    .createQueryBuilder('news')
                    .where(conditions
                    .map((keyword) => {
                    return `LOWER(news.title) LIKE :${keyword}`;
                })
                    .join(' OR '), conditions.reduce((params, keyword) => {
                    return Object.assign(Object.assign({}, params), { [keyword]: `%${keyword.split('_').join(' ')}%` });
                }, {}))
                    .getManyAndCount();
                return [news, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // check image
    checkImage(thumbnailImage, coverImage) {
        if (!thumbnailImage)
            throw new Error('Missing thumbnail image.');
        if (!coverImage)
            throw new Error('Missing cover image.');
    }
    // get all
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { take, skip } = (0, utils_1.paginationQuery)(query);
                const conditionsSearch = (query.search || '')
                    .split(' ')
                    .filter((k) => !!k)
                    .map((k) => k.toLowerCase());
                const queryBuilder = this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('news.saveUsers', 'saves')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('user.news', 'userNews')
                    .leftJoinAndSelect('userNews.hashTags', 'newsHashTags')
                    .leftJoinAndSelect('user.followers', 'userFollowers')
                    .leftJoinAndSelect('news.hashTags', 'hashTags')
                    .leftJoinAndSelect('news.reporterNews', 'reportNews')
                    .leftJoinAndSelect('reportNews.reporter', 'reporter')
                    .take(take)
                    .skip(skip)
                    .orderBy('news.createdAt', query.createdAt || enums_1.Order.DESC);
                if (query === null || query === void 0 ? void 0 : query.readTimes) {
                    queryBuilder.orderBy('news.readTimes', query.readTimes);
                }
                if (query === null || query === void 0 ? void 0 : query.numLikes) {
                    queryBuilder.orderBy('news.numLikes', query.numLikes);
                }
                if (query === null || query === void 0 ? void 0 : query.newsViews) {
                    queryBuilder.orderBy('news.newsViews', query.newsViews);
                }
                if (query === null || query === void 0 ? void 0 : query.search) {
                    queryBuilder.andWhere(conditionsSearch
                        .map((keyword) => {
                        return `LOWER(news.title) LIKE :${keyword}`;
                    })
                        .join(' OR '), conditionsSearch.reduce((params, keyword) => {
                        return Object.assign(Object.assign({}, params), { [keyword]: `%${keyword}%` });
                    }, {}));
                }
                if (query.hashTag) {
                    queryBuilder.andWhere('FIND_IN_SET(:hashTag, CAST(news.hashTagIds AS CHAR)) > 0', {
                        hashTag: query.hashTag.toString(),
                    });
                }
                if (query.status) {
                    queryBuilder.andWhere('news.status = :status', {
                        status: query.status,
                    });
                }
                const [news, count] = yield queryBuilder.getManyAndCount();
                return [news, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get news by recommend
    getAllByRecommend(query) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTagIds = (_a = query.hashTag) === null || _a === void 0 ? void 0 : _a.split(',');
                const news = yield this.newsRepository.findOne({
                    where: {
                        id: query.newsId,
                    },
                });
                const newsList = yield this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.hashTags', 'hashTags')
                    .where('news.id != :newsId', { newsId: query.newsId })
                    .andWhere('hashTags.id IN (:...hashTagIds)', { hashTagIds })
                    .orderBy('news.createdAt', enums_1.Order.DESC)
                    .getMany();
                const newNews = (0, utils_1.recommenderNews)(news === null || news === void 0 ? void 0 : news.title, newsList)
                    .filter((n) => n.similarity >= 0.55)
                    .map((n) => n.news);
                console.log((0, utils_1.recommenderNews)(news === null || news === void 0 ? void 0 : news.title, newsList).map((n) => ({
                    title: n.news.title,
                    score: n.similarity,
                })));
                return newNews;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // create
    create(data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = (0, utils_1.createNews)(data);
                // add hash tags array
                if (((_a = data.hashTagIds) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    news.hashTags = yield hashTag_service_1.hashTagService.getAllByIds(data.hashTagIds);
                }
                else {
                    news.hashTags = [];
                }
                // create slug
                news.slug = common_service_1.commonService.generateSlug(news.title);
                const newNews = yield this.newsRepository.save(news);
                return newNews;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by :id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('news.saveUsers', 'saves')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('user.news', 'newsUser')
                    .leftJoinAndSelect('user.followers', 'followers')
                    .leftJoinAndSelect('newsUser.hashTags', 'hashTagsNewsUser')
                    .leftJoinAndSelect('news.hashTags', 'hashTags')
                    .leftJoinAndSelect('news.comments', 'comments')
                    .where('news.id = :newsId', { newsId: id })
                    .getOne();
                if (!news)
                    return null;
                return news;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by id news into comment
    getByIdComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('news.hashTags', 'hashTags')
                    .where('news.id = :newsId', { newsId: id })
                    .getOne();
                if (!news)
                    return null;
                return news;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by id no relations
    getByIdNoRelations(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('news.hashTags', 'hashTags')
                    .where('news.id = :newsId', { newsId: id })
                    .getOne();
                if (!news)
                    return null;
                return news;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by :slug
    getBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository
                    .createQueryBuilder('news')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('news.saveUsers', 'saves')
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('user.news', 'newsUser')
                    .leftJoinAndSelect('user.followers', 'followers')
                    .leftJoinAndSelect('newsUser.hashTags', 'hashTagsNewsUser')
                    .leftJoinAndSelect('news.hashTags', 'hashTags')
                    .leftJoinAndSelect('news.comments', 'comments')
                    .where('news.slug = :slug', { slug })
                    .getOne();
                if (!news)
                    return null;
                return news;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // update
    update(id, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check news exits
                const news = yield this.newsRepository.findOne({
                    where: {
                        id,
                    },
                });
                if (!news)
                    return null;
                // update hash tags array
                if (((_a = data.hashTagIds) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    news.hashTags = yield hashTag_service_1.hashTagService.getAllByIds(data.hashTagIds);
                }
                else {
                    news.hashTags = [];
                }
                // generate new slug
                if (data.title !== news.title) {
                    data.slug = common_service_1.commonService.generateSlug(data.title);
                }
                // check both thumnail image and cover image is empty
                // this.checkImage(data.thumbnailImage, data.coverImage)
                const newNews = yield this.newsRepository.save(Object.assign(Object.assign({}, news), { title: data.title || news.title, sapo: data.sapo || news.sapo, content: data.content || news.content, newsViews: data.newsViews || news.newsViews, status: data.status || news.status, thumbnailImage: data.thumbnailImage || news.thumbnailImage, coverImage: data.coverImage || news.coverImage, readTimes: data.readTimes || news.readTimes, hashTagIds: data.hashTagIds.length ? data.hashTagIds : [], slug: data.slug || news.slug }));
                return newNews;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // increase nums
    increaseNums(id, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository
                    .createQueryBuilder('news')
                    .where('news.id = :newsId', {
                    newsId: id,
                })
                    .getOne();
                if (news) {
                    const nums = news[key];
                    return yield this.newsRepository.save(Object.assign(Object.assign({}, news), { [key]: nums + 1 }));
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // update all
    updateAll(id, data, notCheck = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check news exits
                const news = yield this.newsRepository.findOne({
                    where: {
                        id,
                    },
                });
                if (!news)
                    return null;
                // generate new slug
                if (data.title !== news.title) {
                    data.slug = common_service_1.commonService.generateSlug(data.title);
                }
                // check both thumnail image and cover image is empty
                if (!notCheck) {
                    this.checkImage(data.thumbnailImage, data.coverImage);
                }
                const newNews = yield this.newsRepository.save(Object.assign(Object.assign({}, news), data));
                return newNews;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // delete
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository.findOne({
                    where: {
                        id,
                    },
                });
                const user = yield _1.userService.getByIdNoRelations(userId);
                if (!news || !user)
                    return null;
                yield this.newsRepository.delete(id);
                return news;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // count viewer of news
    countViews(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.getById(id);
                if (news === null || news === void 0 ? void 0 : news.id) {
                    news.newsViews = news.newsViews + 1;
                    const newNews = yield this.update(id, news);
                    if (newNews)
                        return newNews;
                }
                throw new Error('Not found this news to count views.');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // like news
    like(newsId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = (yield this.getByIdNoRelations(newsId));
                const existingUserLike = yield this.userLikeRepository.findOne({
                    where: {
                        user: {
                            id: user.id,
                        },
                        news: {
                            id: news.id,
                        },
                    },
                });
                if (existingUserLike) {
                    throw new Error(`user ${user.username} liked this news`);
                }
                const data = {
                    userId: user.id,
                    newsId: news.id,
                    user,
                    news,
                };
                const userLike = (0, utils_1.createUserLike)(data);
                yield this.userLikeRepository.save(userLike);
                const newNews = (yield this.getById(newsId));
                server_1.io.to(news === null || news === void 0 ? void 0 : news.slug).emit('likeNews', newNews);
                return news;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // dislike news
    unlike(newsId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository
                    .createQueryBuilder('news')
                    .where('news.id = :newsId', { newsId })
                    .getOne();
                if (!news)
                    throw new Error('Not found this news to unlike.');
                const userLike = yield this.userLikeRepository.findOne({
                    where: { user: { id: user.id }, news: { id: newsId } },
                });
                if (!userLike) {
                    throw new Error(`user ${user.username} doesn't like this news`);
                }
                yield userLike.remove();
                const newNews = (yield this.getById(newsId));
                server_1.io.to(newNews === null || newNews === void 0 ? void 0 : newNews.slug).emit('unlikeNews', newNews);
                return newNews;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // save
    save(newsId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = (yield this.getByIdNoRelations(newsId));
                const existingUserSave = yield this.userSaveRepository.findOne({
                    where: {
                        user: {
                            id: user.id,
                        },
                        news: {
                            id: news.id,
                        },
                    },
                });
                if (existingUserSave) {
                    throw new Error(`user ${user.username} saved this news`);
                }
                const data = {
                    userId: user.id,
                    newsId: news.id,
                    user,
                    news,
                };
                const userLike = (0, utils_1.createUserSave)(data);
                yield this.userSaveRepository.save(userLike);
                const newNews = (yield this.getById(newsId));
                server_1.io.to(newNews === null || newNews === void 0 ? void 0 : newNews.slug).emit('saveNews', newNews);
                return newNews;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // unsave
    unsave(newsId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository
                    .createQueryBuilder('news')
                    .where('news.id = :newsId', { newsId })
                    .getOne();
                if (!news)
                    throw new Error('Not found this news to unlike.');
                const userSave = yield this.userSaveRepository.findOne({
                    where: { user: { id: user.id }, news: { id: newsId } },
                });
                if (!userSave) {
                    throw new Error(`user ${user.username} doesn't save this news`);
                }
                yield userSave.remove();
                const newNews = (yield this.getById(newsId));
                server_1.io.to(newNews === null || newNews === void 0 ? void 0 : newNews.slug).emit('unsaveNews', newNews);
                return newNews;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.newsService = new NewsService();
