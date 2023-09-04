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
exports.hashTagService = void 0;
const config_1 = require("../config");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const common_service_1 = require("./common.service");
const user_service_1 = require("./user.service");
class HashTagService {
    constructor(hashTagRepository = config_1.AppDataSource.getRepository(entities_1.HashTag)) {
        this.hashTagRepository = hashTagRepository;
    }
    // ------------------------------- CHECK -------------------------------------
    checkIdAndHashTagId(id, hashTagId) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = yield user_service_1.userService.getByIdHashTag(id);
            const hashTag = yield this.hashTagRepository.findOne({
                where: {
                    id: hashTagId,
                },
                relations: {
                    users: true,
                },
            });
            if (!self || !hashTag)
                return;
            return {
                user: self,
                hashTag,
            };
        });
    }
    checkFollows(users = [], userId) {
        if (!Array.isArray(users))
            return;
        const newFollows = users.map((user) => user.id);
        return newFollows.includes(userId);
    }
    // check name hash tag exits?
    checkNameHashTag(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = yield this.hashTagRepository.findOne({
                    where: {
                        name,
                    },
                });
                if (hashTag)
                    return hashTag;
                return null;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // check hash tags ids
    checkHashTagIds(hashTagIds) {
        try {
            if (!Array.isArray(hashTagIds))
                return;
            if (hashTagIds.length === 0)
                return;
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    // get all
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTags = yield this.hashTagRepository
                    .createQueryBuilder('hashTag')
                    .leftJoinAndSelect('hashTag.news', 'news')
                    .leftJoinAndSelect('hashTag.users', 'users')
                    .getMany();
                return hashTags;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get all by params
    getAllByParams(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { take, skip } = (0, utils_1.paginationQuery)(query);
                const conditionsSearch = (query.search || '')
                    .split(' ')
                    .map((k) => k.toLowerCase());
                const queryBuilder = this.hashTagRepository
                    .createQueryBuilder('hashTag')
                    .leftJoinAndSelect('hashTag.users', 'users')
                    .leftJoinAndSelect('hashTag.news', 'news')
                    .leftJoinAndSelect('news.user', 'newsUser')
                    .take(take)
                    .skip(skip)
                    .orderBy('hashTag.createdAt', query.createdAt || enums_1.Order.DESC);
                if (query.search) {
                    queryBuilder.andWhere(conditionsSearch
                        .map((keyword) => {
                        return `LOWER(hashTag.name) LIKE :${keyword}`;
                    })
                        .join(' OR '), conditionsSearch.reduce((params, keyword) => {
                        return Object.assign(Object.assign({}, params), { [keyword]: `%${keyword}%` });
                    }, {}));
                }
                const [hashTags, count] = yield queryBuilder.getManyAndCount();
                return [hashTags, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get all hash tag by id
    getAllByIds(hashTagIds = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTags = yield this.hashTagRepository
                    .createQueryBuilder('hashTag')
                    .where('hashTag.id IN (:...ids)', {
                    ids: hashTagIds,
                })
                    .getMany();
                return hashTags;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getIdNoRelation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTags = yield this.hashTagRepository
                    .createQueryBuilder('hashTag')
                    .leftJoinAndSelect('hashTag.users', 'users')
                    .where('hashTag.id = hashTagId', {
                    hashTagId: id,
                })
                    .getOne();
                if (!hashTags)
                    return null;
                return hashTags;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = (0, utils_1.createHashTag)(data);
                // create slug
                hashTag.slug = common_service_1.commonService.generateSlug(data.name);
                const newHashTag = yield this.hashTagRepository.save(hashTag);
                return newHashTag;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = yield this.hashTagRepository
                    .createQueryBuilder('hashTag')
                    .leftJoinAndSelect('hashTag.users', 'users')
                    .leftJoinAndSelect('hashTag.news', 'news')
                    .leftJoinAndSelect('news.user', 'user')
                    .where('hashTag.id = :hashTagId', { hashTagId: id })
                    .getOne();
                if (!hashTag)
                    return null;
                return hashTag;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by name (GET)
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = yield this.hashTagRepository
                    .createQueryBuilder('hashTag')
                    .where('hashTag.name = :name', { name })
                    .leftJoinAndSelect('hashTag.users', 'users')
                    .leftJoinAndSelect('hashTag.news', 'news', 'news.status = :status', {
                    status: enums_1.NewsStatus.PUBLIC,
                })
                    .leftJoinAndSelect('news.user', 'user')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('news.hashTags', 'hashTags')
                    .getOne();
                if (!hashTag)
                    return null;
                return hashTag;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // update (PUT)
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = yield this.hashTagRepository.findOne({
                    where: {
                        id: data.id,
                    },
                });
                if (!hashTag)
                    return null;
                if (data.name) {
                    data.slug = common_service_1.commonService.generateSlug(data.name);
                }
                const newHashTag = yield this.hashTagRepository.save(Object.assign(Object.assign({}, hashTag), { name: data.name || hashTag.name, description: data.description || hashTag.description, iconImage: data.iconImage || hashTag.iconImage, color: data.color || hashTag.color, slug: data.slug || hashTag.slug }));
                return newHashTag;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // update all (PUT)
    updateAll(hashTagId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = yield this.hashTagRepository.findOne({
                    where: {
                        id: hashTagId,
                    },
                });
                if (!hashTag)
                    return null;
                if (data.name) {
                    data.slug = common_service_1.commonService.generateSlug(data.name);
                }
                const newHashTag = yield this.hashTagRepository.save(Object.assign(Object.assign({}, hashTag), data));
                return newHashTag;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // delete (DELETE)
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = yield this.hashTagRepository.findOne({
                    where: {
                        id,
                    },
                });
                if (!hashTag)
                    return null;
                yield this.hashTagRepository.delete(id);
                return hashTag;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // follow (GET)
    follow(id, hashTagId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check id and userId
                const checkHashTags = yield this.checkIdAndHashTagId(id, hashTagId);
                if (!checkHashTags)
                    throw new Error('Unauthorized or this hash tag is not exits.');
                const { user, hashTag } = checkHashTags;
                // check hash tags of user include hash tag id
                // if (!this.checkFollows(user.hashTags, hashTagId))
                //     throw new Error(`'${user.username}' is following '${hashTag.name}'.`)
                // if (!this.checkFollows(hashTag.users, id))
                //     throw new Error(`'${hashTag.name}' has follower '${user.username}'.`)
                const hasHashTag = yield ((_a = user.hashTags) === null || _a === void 0 ? void 0 : _a.find((h) => h.id === hashTagId));
                if (!hasHashTag) {
                    // add hashTagId into hashTags of User
                    (_b = user.hashTags) === null || _b === void 0 ? void 0 : _b.push(hashTag);
                    const newUser = (yield user_service_1.userService.updateAll(id, user, true));
                    // add id into users of HashTag
                    (_c = hashTag.users) === null || _c === void 0 ? void 0 : _c.push(newUser);
                    yield this.hashTagRepository.save(hashTag);
                    return newUser;
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // unfollow (GET)
    unfollow(id, hashTagId) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check id and userId
                const checkHashTags = yield this.checkIdAndHashTagId(id, hashTagId);
                if (!checkHashTags)
                    throw new Error('Unauthorized or this hash tag is not exits.');
                const { user, hashTag } = checkHashTags;
                // check hash tags of user include hash tag id
                // if (!this.checkFollows(user.hashTags, hashTagId))
                //     throw new Error(
                //         `'${user.username}' is not following ${hashTag.name} to unfollow.`
                //     )
                // if (!this.checkFollows(hashTag.users, id))
                //     throw new Error(
                //         `'${hashTag.name}' doesn't have follower '${user.username}'.`
                //     )
                // remove hashTagId into hashTags of User
                const idx = (_a = user.hashTags) === null || _a === void 0 ? void 0 : _a.findIndex((hashTagFollowed) => hashTagFollowed.id === hashTagId);
                if (typeof idx === 'number' && idx >= 0) {
                    (_b = user.hashTags) === null || _b === void 0 ? void 0 : _b.splice(idx, 1);
                    yield user_service_1.userService.updateAll(id, user, true);
                }
                // remove user id into users of HashTag
                const userHashTagIdx = (_c = hashTag.users) === null || _c === void 0 ? void 0 : _c.findIndex((userFollow) => userFollow.id === id);
                if (typeof userHashTagIdx === 'number' && userHashTagIdx >= 0) {
                    (_d = hashTag.users) === null || _d === void 0 ? void 0 : _d.splice(userHashTagIdx, 1);
                    yield this.updateAll(hashTag.id, hashTag);
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.hashTagService = new HashTagService();
