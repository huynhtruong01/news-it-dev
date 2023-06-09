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
exports.userService = void 0;
const config_1 = require("../config");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
const auth_service_1 = require("../services/auth.service");
const common_service_1 = require("../services/common.service");
const role_service_1 = require("../services/role.service");
const utils_1 = require("../utils");
class UserService {
    constructor(userRepository = config_1.AppDataSource.getRepository(entities_1.User)) {
        this.userRepository = userRepository;
    }
    // ----------------- CHECK --------------------------
    checkIdAndUserId(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = yield this.getById(id);
            const user = yield this.getById(userId);
            if (!self || !user)
                return;
            return {
                user: self,
                userFollower: user,
            };
        });
    }
    checkFollows(follows = [], userId) {
        if (!Array.isArray(follows))
            return;
        const newFollows = follows.map((user) => user.id);
        return newFollows.includes(userId);
    }
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { take, skip } = (0, utils_1.paginationQuery)(query);
                const conditionsSearch = (query.search || '')
                    .split(' ')
                    .map((k) => k.toLowerCase());
                const queryBuilder = this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.roles', 'roles')
                    .leftJoinAndSelect('user.followers', 'followers')
                    .leftJoinAndSelect('user.following', 'following')
                    .leftJoinAndSelect('user.hashTags', 'hashTags')
                    .leftJoinAndSelect('user.news', 'news')
                    .leftJoinAndSelect('news.hashTags', 'hashTagsNews')
                    .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                    .leftJoinAndSelect('newsLikes.user', 'newsLikesUser')
                    .leftJoinAndSelect('user.saves', 'saves')
                    .leftJoinAndSelect('saves.hashTags', 'hashTagsSaves')
                    .leftJoinAndSelect('user.comments', 'comments')
                    .leftJoinAndSelect('user.commentLikes', 'commentLikes')
                    .orderBy('user.createdAt', query.createdAt || enums_1.Order.DESC)
                    .take(take)
                    .skip(skip);
                if (query.newsCount) {
                    queryBuilder.orderBy('user.newsCount', query.newsCount);
                }
                if (query.search) {
                    queryBuilder.andWhere(conditionsSearch
                        .map((keyword) => {
                        return `LOWER(user.username) LIKE :${keyword}`;
                    })
                        .join(' OR '), conditionsSearch.reduce((params, keyword) => {
                        return Object.assign(Object.assign({}, params), { [keyword]: `%${keyword}%` });
                    }, {}));
                }
                if (query.isActive) {
                    queryBuilder
                        .andWhere('user.isActive = :isActive')
                        .setParameter('isActive', query.isActive === 'true' ? 1 : 0);
                }
                if (query.isAdmin) {
                    queryBuilder
                        .andWhere('user.isAdmin = :isAdmin')
                        .setParameter('isAdmin', query.isAdmin === 'true' ? 1 : 0);
                }
                const [users, count] = yield queryBuilder.getManyAndCount();
                return [users, count];
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
                const user = (0, utils_1.createUserData)(data);
                // add role when create user
                const roles = yield role_service_1.roleService.getAllRolesById(data.roleIds || []);
                user.roles = roles;
                // create slug by username
                user.slug = common_service_1.commonService.generateSlug(user.username);
                // hash password
                user.password = yield common_service_1.commonService.hashPassword(user.password);
                const newUser = yield this.userRepository.save(user);
                return newUser;
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
                const user = yield this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.roles', 'roles')
                    .leftJoinAndSelect('user.followers', 'followers')
                    .leftJoinAndSelect('user.following', 'following')
                    .leftJoinAndSelect('user.hashTags', 'hashTags')
                    .leftJoinAndSelect('user.news', 'news')
                    .leftJoinAndSelect('news.hashTags', 'hashTagsNews')
                    .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                    .leftJoinAndSelect('newsLikes.hashTags', 'hashTagsNewsLikes')
                    .leftJoinAndSelect('newsLikes.user', 'usersNewsLikes')
                    .leftJoinAndSelect('user.saves', 'saves')
                    .leftJoinAndSelect('saves.hashTags', 'hashTagsSaves')
                    .leftJoinAndSelect('saves.user', 'usersSaves')
                    .leftJoinAndSelect('user.comments', 'comments')
                    .leftJoinAndSelect('user.commentLikes', 'commentLikes')
                    .where('user.id = :userId', { userId: id })
                    .getOne();
                if (!user)
                    return null;
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getByIdNoRelations(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.saves', 'saves')
                    .leftJoinAndSelect('saves.hashTags', 'hashTags')
                    .leftJoinAndSelect('saves.user', 'userSave')
                    .where('user.id = :userId', { userId: id })
                    .getOne();
                if (!user)
                    return null;
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by id for comment
    getByIdComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.followers', 'followers')
                    .where('user.id = :userId', { userId: id })
                    .getOne();
                if (!user)
                    return null;
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by username
    getByUsername(username, noRelations = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.userRepository.createQueryBuilder('user');
                if (!noRelations) {
                    queryBuilder
                        .leftJoinAndSelect('user.roles', 'roles')
                        .leftJoinAndSelect('user.followers', 'followers')
                        .leftJoinAndSelect('user.following', 'following')
                        .leftJoinAndSelect('user.hashTags', 'hashTags')
                        .leftJoinAndSelect('user.news', 'news')
                        .leftJoinAndSelect('news.hashTags', 'hashTagsNews')
                        .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                        .leftJoinAndSelect('newsLikes.hashTags', 'hashTagsNewsLikes')
                        .leftJoinAndSelect('user.saves', 'saves')
                        .leftJoinAndSelect('saves.hashTags', 'hashTagsSaves')
                        .leftJoinAndSelect('user.comments', 'comments')
                        .leftJoinAndSelect('user.commentLikes', 'commentLikes');
                }
                const user = yield queryBuilder
                    .where('user.username = :username', { username })
                    .getOne();
                if (!user)
                    return null;
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get user by filter saves
    getFilterSaves(id, filters) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getByIdNoRelations(id);
                if (!user)
                    return null;
                const newNews = (_a = user.saves) === null || _a === void 0 ? void 0 : _a.filter((n) => {
                    var _a;
                    const search = filters.search === '' || !filters.search
                        ? true
                        : filters.search
                            .toLowerCase()
                            .split(' ')
                            .filter((x) => !!x)
                            .some((w) => n.title.toLowerCase().includes(w));
                    if (!filters.tag)
                        return search;
                    const hasIncludeTag = (_a = n.hashTags) === null || _a === void 0 ? void 0 : _a.some((tag) => tag.name.toLowerCase() === filters.tag.toLowerCase());
                    return search && hasIncludeTag;
                });
                user.saves = newNews;
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by email
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: {
                        emailAddress: email,
                    },
                });
                if (!user)
                    return null;
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by email
    getByIdNoRelation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: {
                        id,
                    },
                });
                if (!user)
                    return null;
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // update
    update(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: {
                        id: userId,
                    },
                });
                if (!user)
                    return null;
                const checkUsername = yield auth_service_1.authService.checkEmailOrUsername(data.username);
                const checkEmail = yield auth_service_1.authService.checkEmailOrUsername(data.emailAddress);
                if (checkUsername && checkUsername.id !== userId) {
                    throw new Error(`'${checkUsername.username}' is exits. Choose another username.`);
                }
                if (checkEmail && checkEmail.id !== userId) {
                    throw new Error(`'${checkEmail.emailAddress}' is exits. Choose another email.`);
                }
                if (data.username) {
                    data.slug = common_service_1.commonService.generateSlug(data.username);
                }
                const newUser = yield this.userRepository.save(Object.assign(Object.assign({}, user), { username: data.username, firstName: data.firstName || user.firstName, lastName: data.lastName || user.lastName, emailAddress: data.emailAddress || user.emailAddress, websiteUrl: data.websiteUrl || user.websiteUrl, bio: data.bio || user.bio, currentlyLearning: data.currentlyLearning || user.currentlyLearning, skillLanguages: data.skillLanguages || user.skillLanguages, education: data.education || user.education, work: data.work || user.work, slug: data.slug || user.slug, avatar: data.avatar || user.avatar }));
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // update all
    updateAll(userId, data, noCheckUsername = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: {
                        id: userId,
                    },
                });
                if (!user)
                    return null;
                if (!noCheckUsername) {
                    const checkUsername = yield auth_service_1.authService.checkEmailOrUsername(data.username);
                    const checkEmail = yield auth_service_1.authService.checkEmailOrUsername(data.username);
                    if (checkUsername && checkUsername.id !== data.id) {
                        throw new Error(`${data.username} is exits. Choose another username.`);
                    }
                    if (checkEmail && checkEmail.id !== data.id) {
                        throw new Error(`${data.emailAddress} is exits. Choose another email.`);
                    }
                    if (data.username) {
                        data.slug = common_service_1.commonService.generateSlug(data.username);
                    }
                }
                const newUser = yield this.userRepository.save(Object.assign(Object.assign({}, user), data));
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    countNews(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = user;
                newUser.newsCount = newUser.newsCount + 1;
                yield this.userRepository.save(Object.assign({}, newUser));
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // delete
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: {
                        id,
                    },
                });
                if (!user)
                    return null;
                yield this.userRepository.delete(id);
                return user;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // TODO: edit profile
    updateProfile(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getById(userId);
                if (!user)
                    throw new Error('Not found this user to update profile.');
                const newUser = yield this.update(userId, data);
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // follow
    follow(id, userId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check id and userId
                const checkUsers = yield this.checkIdAndUserId(id, userId);
                if (!checkUsers)
                    throw new Error('Unauthorized or this user is not exits.');
                const { user, userFollower } = checkUsers;
                // check following include userId
                if (this.checkFollows(user.following, userId))
                    throw new Error(`'${user.username}' is following.`);
                if (this.checkFollows(userFollower.followers, id))
                    throw new Error(`'${userFollower.username}' has follower '${user.username}'.`);
                // add userId into following
                (_a = user.following) === null || _a === void 0 ? void 0 : _a.push(userFollower);
                user.numFollowing = user.numFollowing + 1;
                const newUser = yield this.userRepository.save(user);
                // add id into follower of this userId
                (_b = userFollower.followers) === null || _b === void 0 ? void 0 : _b.push(newUser);
                userFollower.numFollowers = userFollower.numFollowers + 1;
                yield this.userRepository.save(userFollower);
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // unfollow
    unfollow(id, userId) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check id and userId
                const checkUsers = yield this.checkIdAndUserId(id, userId);
                if (!checkUsers)
                    throw new Error('Unauthorized or this user is not exits.');
                const { user, userFollower } = checkUsers;
                // check following include userId
                if (!this.checkFollows(user.following, userId))
                    throw new Error(`'${user.username}' isn't following to unfollowing.`);
                if (!this.checkFollows(userFollower.followers, id))
                    throw new Error(`'${userFollower.username}' doesn't have follower '${user.username} to unfollow'.`);
                let newUser = null;
                // remove userId into following
                const idx = (_a = user.following) === null || _a === void 0 ? void 0 : _a.findIndex((follow) => follow.id === userId);
                user.numFollowing = user.numFollowing === 0 ? 0 : user.numFollowing - 1;
                if (typeof idx === 'number' && idx >= 0) {
                    (_b = user.following) === null || _b === void 0 ? void 0 : _b.splice(idx, 1);
                    const updateUser = yield this.userRepository.save(user);
                    newUser = updateUser;
                }
                // remove id into follower of this userId
                const idxUser = (_c = userFollower.followers) === null || _c === void 0 ? void 0 : _c.findIndex((follow) => follow.id === id);
                userFollower.numFollowers =
                    userFollower.numFollowers === 0 ? 0 : userFollower.numFollowers - 1;
                if (typeof idxUser === 'number' && idxUser >= 0) {
                    (_d = userFollower.followers) === null || _d === void 0 ? void 0 : _d.splice(idxUser, 1);
                    yield this.userRepository.save(userFollower);
                }
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.userService = new UserService();
