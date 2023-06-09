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
exports.commonService = void 0;
const config_1 = require("../config");
const entities_1 = require("../entities");
const bcrypt_1 = __importDefault(require("bcrypt"));
const slugify_1 = __importDefault(require("slugify"));
class CommonService {
    constructor(userRepository = config_1.AppDataSource.getRepository(entities_1.User), newsRepository = config_1.AppDataSource.getRepository(entities_1.News), hashTagRepository = config_1.AppDataSource.getRepository(entities_1.HashTag), roleRepository = config_1.AppDataSource.getRepository(entities_1.Role)) {
        this.userRepository = userRepository;
        this.newsRepository = newsRepository;
        this.hashTagRepository = hashTagRepository;
        this.roleRepository = roleRepository;
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(Number(process.env.SECRET_PASSWORD));
            return yield bcrypt_1.default.hash(password, salt);
        });
    }
    comparePassword(password, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, userPassword);
        });
    }
    generateSlug(data, options) {
        return (0, slugify_1.default)(`${data} ${Date.now()}`, Object.assign({ replacement: '-', lower: true, locale: 'vi', trim: true, strict: true }, options));
    }
    statisticalDashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userCount = yield this.userRepository
                    .createQueryBuilder('user')
                    .getCount();
                const roleCount = yield this.roleRepository
                    .createQueryBuilder('role')
                    .getCount();
                const hashTagCount = yield this.hashTagRepository
                    .createQueryBuilder('hashTag')
                    .getCount();
                const newsCount = yield this.newsRepository
                    .createQueryBuilder('news')
                    .getCount();
                const newsLikesCount = yield this.newsRepository
                    .createQueryBuilder('news')
                    .select('SUM(news.numLikes) AS numLikes')
                    .getRawOne();
                return {
                    numUser: userCount,
                    numRole: roleCount,
                    numHashTag: hashTagCount,
                    numNews: newsCount,
                    numLikes: parseInt(newsLikesCount.numLikes),
                };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.commonService = new CommonService();
