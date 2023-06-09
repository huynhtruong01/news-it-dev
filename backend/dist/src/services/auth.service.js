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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const config_1 = require("../config");
const consts_1 = require("../consts");
const entities_1 = require("../entities");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(userRepository = config_1.AppDataSource.getRepository(entities_1.User)) {
        this.userRepository = userRepository;
    }
    // check email or username exits
    checkEmailOrUsername(usernameOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!usernameOrEmail)
                    return null;
                const emailUser = yield this.userRepository
                    .createQueryBuilder('user')
                    .where('user.emailAddress = :emailAddress', {
                    emailAddress: usernameOrEmail,
                })
                    .getOne();
                const usernameUser = yield this.userRepository
                    .createQueryBuilder('user')
                    .where('user.username = :username', {
                    username: usernameOrEmail,
                })
                    .getOne();
                if (usernameUser)
                    return usernameUser;
                if (emailUser)
                    return emailUser;
                return null;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // check email
    getByEmail(emailAddress) {
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
                    .leftJoinAndSelect('user.saves', 'saves')
                    .leftJoinAndSelect('saves.hashTags', 'hashTagsSaves')
                    .leftJoinAndSelect('user.comments', 'comments')
                    .where('user.emailAddress = :emailAddress', {
                    emailAddress,
                })
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
    // sign access token
    signAccessToken(id) {
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES,
        });
    }
    // sign refresh token
    signRefreshToken(id) {
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES,
        });
    }
    // sign active token
    signActiveToken(user) {
        return jsonwebtoken_1.default.sign({ newUser: user }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_ACTIVE_EXPIRES,
        });
    }
    // verify token
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    // verify token by Buffer
    verifyTokenBuffer(token) {
        return JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    }
    // set token cookies
    setCookieToken(res, key, value, maxAge = consts_1.MAX_AGE_REFRESH_TOKEN) {
        res.cookie(key, value, Object.assign({}, (0, utils_1.optionCookies)({ maxAge })));
    }
}
exports.authService = new AuthService();
