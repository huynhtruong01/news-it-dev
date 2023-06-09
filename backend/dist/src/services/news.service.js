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
const data_1 = require("../data");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
const common_service_1 = require("../services/common.service");
const hashTag_service_1 = require("../services/hashTag.service");
const utils_1 = require("../utils");
const server_1 = require("../../server");
const _1 = require(".");
class NewsService {
    constructor(newsRepository = config_1.AppDataSource.getRepository(entities_1.News)) {
        this.newsRepository = newsRepository;
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
    getAllByConditional(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pagination = (0, utils_1.paginationQuery)(query);
                if (query.hashTag) {
                    const hashTagIds = query.hashTag.split(',');
                    const [news, count] = yield this.newsRepository
                        .createQueryBuilder('news')
                        .leftJoinAndSelect('news.user', 'user')
                        .leftJoinAndSelect('news.hashTags', 'hashTag')
                        .where('news.status = :status', { status: enums_1.NewsStatus.PUBLIC })
                        .andWhere('hashTag.id IN (:...hashTagIds)', {
                        hashTagIds,
                    })
                        .orderBy('news.createdAt', enums_1.Order.DESC)
                        .skip(pagination.skip)
                        .take(pagination.take)
                        .getManyAndCount();
                    return [news, count];
                }
                if (query.search && query.search.split(' ').length >= 2) {
                    const conditions = query.search
                        .split(' ')
                        .map((k) => k.toLowerCase());
                    const [news, count] = yield this.newsRepository
                        .createQueryBuilder('news')
                        .leftJoinAndSelect('news.user', 'user')
                        .leftJoinAndSelect('news.hashTags', 'hashTag')
                        .where('news.status = :status', { status: enums_1.NewsStatus.PUBLIC })
                        .andWhere(conditions
                        .map((keyword) => {
                        return `LOWER(news.title) LIKE :${keyword}`;
                    })
                        .join(' OR '), conditions.reduce((params, keyword) => {
                        return Object.assign(Object.assign({}, params), { [keyword]: `%${keyword}%` });
                    }, {}))
                        .orderBy('news.createdAt', enums_1.Order.DESC)
                        .skip(pagination.skip)
                        .take(pagination.take)
                        .getManyAndCount();
                    return [news, count];
                }
                const newFiltersQuery = (0, utils_1.filtersQuery)(query);
                const newSortQuery = (0, utils_1.sortQuery)(query);
                const titleSearchQuery = (0, utils_1.searchQuery)(query, 'title');
                const [news, count] = yield this.newsRepository.findAndCount(Object.assign(Object.assign({ order: Object.assign({}, newSortQuery), where: Object.assign(Object.assign(Object.assign({}, titleSearchQuery), newFiltersQuery), { status: enums_1.NewsStatus.PUBLIC }) }, pagination), { relations: data_1.relationNewsData }));
                return [news, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    checkImage(thumbnailImage, coverImage) {
        if (!thumbnailImage)
            throw new Error('Missing thumbnail image.');
        if (!coverImage)
            throw new Error('Missing cover image.');
    }
    // QUERY
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
                    .take(take)
                    .skip(skip)
                    .orderBy('news.createdAt', query.createdAt || enums_1.Order.DESC);
                if (query.readTimes) {
                    queryBuilder.orderBy('news.readTimes', query.readTimes);
                }
                if (query.newsLikes) {
                    queryBuilder.orderBy('news.newsLikes', query.newsLikes);
                }
                if (query.newsViews) {
                    queryBuilder.orderBy('news.newsViews', query.newsViews);
                }
                if (query.search) {
                    queryBuilder.andWhere(conditionsSearch
                        .map((keyword) => {
                        return `LOWER(news.title) LIKE :${keyword}`;
                    })
                        .join(' OR '), conditionsSearch.reduce((params, keyword) => {
                        return Object.assign(Object.assign({}, params), { [keyword]: `%${keyword}%` });
                    }, {}));
                }
                if (query.hashTag) {
                    queryBuilder.andWhere(':hashTag IN (news.hashTagIds)', {
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
    // get news by hash tag ids
    getAllByTagIds(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.newsRepository
                    .createQueryBuilder('news')
                    .where('hashTagIds IN (:...hashTagIdsQuery)')
                    .andWhere('news.status = :status', { status: query.status })
                    .orderBy('news.createdAt', query.createdAt)
                    .setParameter('hashTagIdsQuery', query.hashTagIds)
                    .skip((+query.page - 1) * +query.limit)
                    .take(+query.limit)
                    .getMany();
                return news;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // create
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = (0, utils_1.createNews)(data);
                // add hash tags array
                if (data.hashTagIds.length > 0) {
                    news.hashTags = yield hashTag_service_1.hashTagService.getAllByIds(data.hashTagIds);
                }
                else {
                    news.hashTags = [];
                }
                // create slug
                news.slug = common_service_1.commonService.generateSlug(news.title);
                const user = yield _1.userService.getById(data.userId);
                if (user) {
                    yield _1.userService.updateAll(user.id, user);
                }
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
                if (data.title) {
                    data.slug = common_service_1.commonService.generateSlug(data.title);
                }
                // check both thumnail image and cover image is empty
                this.checkImage(data.thumbnailImage, data.coverImage);
                const newNews = yield this.newsRepository.save(Object.assign(Object.assign({}, news), { title: data.title || news.title, sapo: data.sapo || news.sapo, content: data.content || news.content, newsViews: data.newsViews || news.newsViews, status: data.status || news.status, thumbnailImage: data.thumbnailImage || news.thumbnailImage, coverImage: data.coverImage || news.coverImage, readTimes: data.readTimes || news.readTimes, slug: data.slug || news.slug }));
                return newNews;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // update all
    updateAll(id, data) {
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
                this.checkImage(data.thumbnailImage, data.coverImage);
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
                const user = yield _1.userService.getById(userId);
                if (!news || !user)
                    return null;
                user.newsCount = user.newsCount - 1;
                yield _1.userService.updateAll(userId, user);
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
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.getById(newsId);
                if (!news)
                    throw new Error('Not found this news to like.');
                // check user liked
                if (this.checkUserExitsInLikes(news.likes, user.id))
                    throw new Error(`User '${user.username}' liked to '${news.title}' news.`);
                const newUser = (yield _1.userService.updateAll(user.id, Object.assign(Object.assign({}, user), { numNewsLike: user.numNewsLike + 1 }), true));
                // add user into likes
                (_a = news.likes) === null || _a === void 0 ? void 0 : _a.push(newUser);
                news.numLikes++;
                const newNews = yield this.updateAll(newsId, news);
                server_1.io.to(newNews === null || newNews === void 0 ? void 0 : newNews.slug).emit('likeNews', Object.assign(Object.assign({}, news), newNews));
                return newNews;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // dislike news
    dislike(newsId, user) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.getById(newsId);
                if (!news)
                    throw new Error('Not found this news to unlike.');
                const idx = (_a = news.likes) === null || _a === void 0 ? void 0 : _a.findIndex((user) => user.id === user.id);
                if (typeof idx === 'number' && idx >= 0) {
                    (_b = news.likes) === null || _b === void 0 ? void 0 : _b.splice(idx, 1);
                    news.numLikes--;
                    if (news.numLikes < 0)
                        news.numLikes = 0;
                    yield _1.userService.updateAll(user.id, Object.assign(Object.assign({}, user), { numNewsLike: user.numNewsLike - 1 }), true);
                    const newNews = yield this.updateAll(newsId, news);
                    server_1.io.to(newNews === null || newNews === void 0 ? void 0 : newNews.slug).emit('unlikeNews', newNews);
                    return newNews;
                }
                throw new Error(`User '${user.username}' doesn't like.`);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // save
    save(newsId, user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.getById(newsId);
                if (!news)
                    throw new Error('Not found this news to save.');
                if (this.checkUserExitsInSaves(news.saveUsers, user.id))
                    throw new Error(`'${news.title}' has been exits in your saves.`);
                const newUser = (yield _1.userService.updateAll(user.id, Object.assign(Object.assign({}, user), { numNewsSaves: user.numNewsSaves + 1 }), true));
                (_a = news.saveUsers) === null || _a === void 0 ? void 0 : _a.push(newUser);
                news.numSaves++;
                const newNews = yield this.updateAll(newsId, news);
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const news = yield this.getById(newsId);
                if (!news)
                    throw new Error('Not found this news to save.');
                if (!this.checkUserExitsInSaves(news.saveUsers, user.id))
                    throw new Error(`'${news.title}' news doesn't save.`);
                const idx = (_a = news.saveUsers) === null || _a === void 0 ? void 0 : _a.findIndex((userSave) => userSave.id === user.id);
                if (typeof idx === 'number' && idx >= 0) {
                    (_b = news.saveUsers) === null || _b === void 0 ? void 0 : _b.splice(idx, 1);
                    if (news.numSaves > 0)
                        news.numSaves--;
                    (yield _1.userService.updateAll(user.id, Object.assign(Object.assign({}, user), { numNewsSaves: user.numNewsSaves - 1 }), true));
                    const newNews = yield this.updateAll(newsId, news);
                    server_1.io.to(newNews === null || newNews === void 0 ? void 0 : newNews.slug).emit('unsaveNews', newNews);
                    return newNews;
                }
                throw new Error(`Not found '${user.username}' to unsave.`);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.newsService = new NewsService();
