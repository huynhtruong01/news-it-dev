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
exports.notifyService = void 0;
const config_1 = require("../config");
const data_1 = require("../data");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
const services_1 = require("../services");
const utils_1 = require("../utils");
const server_1 = require("../server");
class NotifyService {
    constructor(notifyRepository = config_1.AppDataSource.getRepository(entities_1.Notify)) {
        this.notifyRepository = notifyRepository;
    }
    // get all
    getAll(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pagination = (0, utils_1.paginationQuery)(query);
                const [notifications, count] = yield this.notifyRepository
                    .createQueryBuilder('notify')
                    .leftJoinAndSelect('notify.user', 'user')
                    .leftJoinAndSelect('notify.news', 'news')
                    .leftJoinAndSelect('news.hashTags', 'hashTags')
                    .leftJoinAndSelect('news.saveUsers', 'saveUsers')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('notify.recipients', 'recipients')
                    .where((qb) => {
                    qb.where('notify.newsId IS NULL AND recipients.id = :userId', {
                        userId,
                    }).orWhere('notify.newsId IS NOT NULL AND recipients.id = :userId', {
                        userId,
                    });
                })
                    .andWhere('LOWER(news.title) LIKE LOWER(:search)', {
                    search: `%${query.search || ''}%`,
                })
                    .orderBy('notify.createdAt', enums_1.Order.DESC)
                    .take(pagination.take)
                    .skip(pagination.skip)
                    .getManyAndCount();
                let newNotifications = [...notifications];
                let newCount = count;
                if (query.isRead) {
                    newNotifications = newNotifications.filter((n) => {
                        var _a, _b;
                        return Number(query.isRead) === 0
                            ? !((_a = n.readUsers) === null || _a === void 0 ? void 0 : _a.includes(userId.toString()))
                            : (_b = n.readUsers) === null || _b === void 0 ? void 0 : _b.includes(userId.toString());
                    });
                }
                if (newNotifications.length === 0)
                    newCount = 0;
                return [newNotifications, newCount];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get all no conditions
    getAllNoConditions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [notifies, count] = yield this.notifyRepository.findAndCount({
                    relations: data_1.relationDataNotify,
                    order: {
                        createdAt: enums_1.Order.DESC,
                    },
                });
                return [notifies, count];
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
                const notify = (0, utils_1.createNotify)(data);
                if (data.user) {
                    notify.user = data.user;
                }
                notify.news = data.news ? data.news : null;
                const newNotify = yield this.notifyRepository.save(notify);
                return newNotify;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // create multiple for comment
    createMultiForComment(data, users) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipients = [];
                for (const username of users) {
                    const user = yield services_1.userService.getByUsername(username, true);
                    if (user) {
                        recipients.push(user);
                    }
                }
                const notify = (0, utils_1.createNotify)(Object.assign(Object.assign({}, data), { recipients }));
                if (data.news) {
                    notify.news = data.news;
                }
                if (data.user) {
                    notify.user = data.user;
                }
                const newNotify = yield this.notifyRepository.save(notify);
                for (const user of recipients) {
                    server_1.io.to(user.id.toString()).emit('notifyNews', newNotify);
                }
                return newNotify;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by newsId
    getByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield this.notifyRepository
                    .createQueryBuilder('notify')
                    .leftJoinAndSelect('notify.recipients', 'recipients')
                    .where('notify.id = :notifyId', {
                    notifyId: id,
                })
                    .getOne();
                if (!notify)
                    return null;
                return notify;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield this.notifyRepository
                    .createQueryBuilder('notify')
                    .leftJoinAndSelect('notify.user', 'user')
                    .leftJoinAndSelect('notify.news', 'news')
                    .leftJoinAndSelect('news.saveUsers', 'saves')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('news.hashTags', 'hashTags')
                    .leftJoinAndSelect('notify.recipients', 'recipients')
                    .where('notify.id = :notifyId', {
                    notifyId: id,
                })
                    .getOne();
                if (!notify)
                    return null;
                return notify;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by id no relation
    getByIdNoRelations(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield this.notifyRepository
                    .createQueryBuilder('notify')
                    .where('notify.id = :notifyId', { notifyId: id })
                    .getOne();
                if (!notify)
                    return null;
                return notify;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // push id read users
    readUsers(id, userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield this.getByIdNoRelations(id);
                if (!notify)
                    return null;
                (_a = notify.readUsers) === null || _a === void 0 ? void 0 : _a.push(userId);
                const newNotify = yield this.notifyRepository.save(Object.assign({}, notify));
                return newNotify;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // delete by newsId
    delete(id, userId) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notify = yield this.notifyRepository
                    .createQueryBuilder('notify')
                    .leftJoinAndSelect('notify.recipients', 'recipients')
                    .where('notify.id = :notifyId', { notifyId: id })
                    .getOne();
                if (!notify)
                    return null;
                const indexRead = (_a = notify.readUsers) === null || _a === void 0 ? void 0 : _a.findIndex((n) => Number(n) === userId);
                if (indexRead > -1)
                    (_b = notify.readUsers) === null || _b === void 0 ? void 0 : _b.splice(indexRead, 1);
                const indexRecipients = (_c = notify.recipients) === null || _c === void 0 ? void 0 : _c.findIndex((n) => Number(n.id) === userId);
                if (indexRecipients > -1)
                    (_d = notify.recipients) === null || _d === void 0 ? void 0 : _d.splice(indexRecipients, 1);
                yield this.notifyRepository.save(Object.assign({}, notify));
                return notify;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // delete by userId
    deleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifies = yield this.notifyRepository
                    .createQueryBuilder('notify')
                    .leftJoinAndSelect('notify.recipients', 'recipients')
                    .where('recipients.id = :userId', { userId })
                    .getMany();
                const newNotifies = notifies.map((notify) => {
                    var _a;
                    const newRecipients = (_a = notify === null || notify === void 0 ? void 0 : notify.recipients) === null || _a === void 0 ? void 0 : _a.filter((u) => u.id !== userId);
                    notify.recipients = newRecipients;
                    return notify;
                });
                yield this.notifyRepository.save(newNotifies);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.notifyService = new NotifyService();
