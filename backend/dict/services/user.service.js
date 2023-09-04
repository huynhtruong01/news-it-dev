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
    constructor(userRepository = config_1.AppDataSource.getRepository(entities_1.User), userFollowRepository = config_1.AppDataSource.getRepository(entities_1.UserFollow)) {
        this.userRepository = userRepository;
        this.userFollowRepository = userFollowRepository;
    }
    // ----------------- CHECK --------------------------
    checkIdAndUserId(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = yield this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.following', 'following')
                .where('user.id = :userId', {
                userId: id,
            })
                .getOne();
            const user = yield this.userRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.followers', 'followers')
                .where('user.id = :userId', {
                userId,
            })
                .getOne();
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
                    .leftJoinAndSelect('followers.user', 'followersUser')
                    .leftJoinAndSelect('user.following', 'following')
                    .leftJoinAndSelect('following.follower', 'userFollowing')
                    .leftJoinAndSelect('user.hashTags', 'hashTags')
                    .leftJoinAndSelect('user.news', 'news')
                    .leftJoinAndSelect('news.hashTags', 'hashTagsNews')
                    .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                    .leftJoinAndSelect('newsLikes.news', 'newsLikesUser')
                    .leftJoinAndSelect('user.saves', 'saves')
                    .leftJoinAndSelect('saves.news', 'newsSaves')
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
                    queryBuilder.andWhere('roles.id = :roleId', { roleId: query.isAdmin });
                    // .setParameter('isAdmin', query.isAdmin === 'true' ? 1 : 0)
                }
                const [users, count] = yield queryBuilder.getManyAndCount();
                return [users, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get all user suggestion
    getAllSuggestion(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 1. get all user not in following
                const self = yield this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.following', 'following')
                    .leftJoinAndSelect('following.follower', 'follower')
                    .leftJoinAndSelect('user.followers', 'followers')
                    .leftJoinAndSelect('user.saves', 'saves')
                    .leftJoinAndSelect('user.comments', 'comments')
                    .leftJoinAndSelect('user.news', 'news')
                    .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                    .where('user.id = :userId', {
                    userId: user.id,
                })
                    .getOne();
                if (!self)
                    return [];
                const followingIds = (_a = self.following) === null || _a === void 0 ? void 0 : _a.map((u) => u.followerId);
                const queryBuilder = this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                    .where('user.id != :userId', {
                    userId: self.id,
                });
                if (followingIds.length) {
                    queryBuilder.andWhere('user.id NOT IN (:...followingIds)', {
                        followingIds,
                    });
                }
                const users = yield queryBuilder.getMany();
                const similarityUsers = (0, utils_1.recommenderUsers)(self, users)
                    .filter((u) => u.score >= 0.5)
                    .sort((a, b) => b.score - a.score)
                    .map((u) => u.user);
                return similarityUsers;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get top user
    getTopFollowers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.followers', 'followers')
                    .orderBy('user.numFollowers', enums_1.Order.DESC)
                    .skip(0)
                    .take(8)
                    .getMany();
                const newUser = users.filter((u) => u.numFollowers > 0);
                return newUser;
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
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.followers', 'followers')
                    .leftJoinAndSelect('followers.user', 'followersUser')
                    .leftJoinAndSelect('user.following', 'following')
                    .leftJoinAndSelect('following.follower', 'userFollowing')
                    .leftJoinAndSelect('user.hashTags', 'hashTags')
                    .leftJoinAndSelect('user.news', 'news')
                    .leftJoinAndSelect('news.likes', 'likesNews')
                    .leftJoinAndSelect('news.hashTags', 'hashTagsNews')
                    .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                    .leftJoinAndSelect('newsLikes.news', 'newsNewsLikes')
                    .leftJoinAndSelect('newsNewsLikes.user', 'newsLikesUser')
                    .leftJoinAndSelect('newsNewsLikes.likes', 'likes')
                    .leftJoinAndSelect('user.saves', 'saves')
                    .leftJoinAndSelect('saves.news', 'newsSaves')
                    .leftJoinAndSelect('newsSaves.likes', 'saveLikes')
                    .leftJoinAndSelect('newsSaves.user', 'saveUser')
                    .leftJoinAndSelect('newsSaves.hashTags', 'saveUserHashTags')
                    .leftJoinAndSelect('user.searchHistory', 'searchHistory');
                const user = yield queryBuilder
                    .where('user.id = :userId', { userId: id })
                    .getOne();
                if (!user)
                    return null;
                const newUser = Object.assign(Object.assign({}, user), { following: (_a = user === null || user === void 0 ? void 0 : user.following) === null || _a === void 0 ? void 0 : _a.map((u) => (Object.assign({}, u.follower))), followers: (_b = user === null || user === void 0 ? void 0 : user.followers) === null || _b === void 0 ? void 0 : _b.map((u) => (Object.assign({}, u.user))), newsLikes: (_c = user === null || user === void 0 ? void 0 : user.newsLikes) === null || _c === void 0 ? void 0 : _c.map((u) => (Object.assign({}, u.news))), saves: (_d = user === null || user === void 0 ? void 0 : user.saves) === null || _d === void 0 ? void 0 : _d.map((u) => (Object.assign({}, u.news))) });
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getByIdSaves(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.saves', 'saves')
                    .leftJoinAndSelect('saves.news', 'newsSave')
                    .leftJoinAndSelect('newsSave.hashTags', 'newsSaveHashTags')
                    .leftJoinAndSelect('newsSave.user', 'newsSaveUser')
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
                const queryBuilder = this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.news', 'news')
                    .leftJoinAndSelect('news.likes', 'likes')
                    .leftJoinAndSelect('news.hashTags', 'hashTagsNews')
                    .leftJoinAndSelect('user.hashTags', 'hashTags')
                    .leftJoinAndSelect('user.followers', 'followers')
                    .leftJoinAndSelect('user.following', 'following');
                if (!noRelations) {
                    queryBuilder
                        .leftJoinAndSelect('user.roles', 'roles')
                        .leftJoinAndSelect('user.newsLikes', 'newsLikes')
                        .leftJoinAndSelect('newsLikes.news', 'newsNewsLikes')
                        .leftJoinAndSelect('newsNewsLikes.hashTags', 'newsLikesHashTags')
                        .leftJoinAndSelect('newsNewsLikes.user', 'newsLikesUser')
                        .leftJoinAndSelect('newsNewsLikes.likes', 'likes')
                        .leftJoinAndSelect('user.saves', 'saves')
                        .leftJoinAndSelect('saves.news', 'newsSaves')
                        .leftJoinAndSelect('newsSaves.likes', 'saveLikes')
                        .leftJoinAndSelect('newsSaves.user', 'saveUser')
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
                const user = yield this.getByIdSaves(id);
                if (!user)
                    return null;
                const newNews = (_a = user.saves) === null || _a === void 0 ? void 0 : _a.filter((userSave) => {
                    var _a, _b;
                    const search = filters.search === '' || !filters.search
                        ? true
                        : filters.search
                            .toLowerCase()
                            .split(' ')
                            .filter((x) => !!x)
                            .some((w) => { var _a, _b; return (_b = (_a = userSave.news) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(w); });
                    if (!filters.tag)
                        return search;
                    const hasIncludeTag = (_b = (_a = userSave.news) === null || _a === void 0 ? void 0 : _a.hashTags) === null || _b === void 0 ? void 0 : _b.some((tag) => tag.name.toLowerCase() === filters.tag.toLowerCase());
                    return search && hasIncludeTag;
                });
                user.saves = newNews === null || newNews === void 0 ? void 0 : newNews.map((userSave) => (Object.assign({}, userSave.news)));
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
    // get by id for hash tag
    getByIdHashTag(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.hashTags', 'hashTags')
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
    // get by id no relation
    getByIdNoRelations(id, hasRole = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.userRepository
                    .createQueryBuilder('user')
                    .where('user.id = :userId', { userId: id });
                if (hasRole) {
                    queryBuilder.leftJoinAndSelect('user.roles', 'role');
                }
                const user = yield queryBuilder.getOne();
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
                const roles = yield role_service_1.roleService.getAllRolesById(data.roleIds || []);
                user.roles = roles;
                const newUser = yield this.userRepository.save(Object.assign(Object.assign({}, user), { username: data.username, firstName: data.firstName || user.firstName, lastName: data.lastName || user.lastName, emailAddress: data.emailAddress || user.emailAddress, websiteUrl: data.websiteUrl || user.websiteUrl, bio: data.bio || user.bio, currentlyLearning: data.currentlyLearning || user.currentlyLearning, skillLanguages: data.skillLanguages || user.skillLanguages, education: data.education || user.education, work: data.work || user.work, slug: data.slug || user.slug, avatar: data.avatar || user.avatar, bandingColor: data.bandingColor || user.bandingColor, isAdmin: data.isAdmin || user.isAdmin }));
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
                const user = yield this.userRepository
                    .createQueryBuilder('user')
                    .where('user.id = :userId', { userId })
                    .getOne();
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
    // save user
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.userRepository.save(user);
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // count news
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
                const user = yield this.userRepository
                    .createQueryBuilder('user')
                    .where('user.id = :userId', {
                    userId: id,
                })
                    .getOne();
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
    // edit profile
    updateProfile(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getByIdNoRelations(userId);
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository
                    .createQueryBuilder('user')
                    .where('user.id = :userId', {
                    userId: id,
                })
                    .getOne();
                const userFollow = yield this.userRepository
                    .createQueryBuilder('follower')
                    .where('follower.id = :followerId', {
                    followerId: userId,
                })
                    .getOne();
                if (!user || !userFollow) {
                    throw new Error('User or user to follow not found');
                }
                const existingFollow = yield this.userFollowRepository.findOne({
                    where: { user: { id: user.id }, follower: { id: userFollow.id } },
                });
                if (existingFollow) {
                    throw new Error('User is already being followed');
                }
                const follower = (0, utils_1.createUserFollow)({
                    userId: id,
                    followerId: userId,
                    user,
                    follower: userFollow,
                });
                const newFollower = yield this.userFollowRepository.save(follower);
                return newFollower;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // unfollow
    unfollow(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository
                    .createQueryBuilder('user')
                    .where('user.id = :userId', {
                    userId: id,
                })
                    .getOne();
                const userFollow = yield this.userRepository
                    .createQueryBuilder('follower')
                    .where('follower.id = :followerId', {
                    followerId: userId,
                })
                    .getOne();
                if (!user || !userFollow) {
                    throw new Error('User or user to unfollow not found');
                }
                const follow = yield this.userFollowRepository.findOne({
                    where: { user: { id: user.id }, follower: { id: userFollow.id } },
                });
                if (!follow) {
                    throw new Error('User is not being followed');
                }
                yield this.userFollowRepository.remove(follow);
                return follow;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.userService = new UserService();
