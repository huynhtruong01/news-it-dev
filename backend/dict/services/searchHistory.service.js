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
exports.searchHistoryService = void 0;
const config_1 = require("../config");
const entities_1 = require("../entities");
const utils_1 = require("../utils");
class SearchHistoryService {
    constructor(searchHistoryRepository = config_1.AppDataSource.getRepository(entities_1.UserSearchHistory)) {
        this.searchHistoryRepository = searchHistoryRepository;
    }
    // find all by userId
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchHistories = yield this.searchHistoryRepository
                    .createQueryBuilder('searchHistory')
                    .where('searchHistory.userId = :userId', { userId })
                    .getMany();
                return searchHistories;
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
                const searchHistory = (0, utils_1.createSearchHistory)(data);
                if (data.user) {
                    searchHistory.user = data.user;
                }
                yield this.searchHistoryRepository.save(searchHistory);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by search query
    getBySearchQuery(searchQuery, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userSearchHistory = yield this.searchHistoryRepository
                    .createQueryBuilder('searchUser')
                    .where('searchUser.searchQuery = :search', {
                    search: searchQuery,
                })
                    .andWhere('searchUser.userId = :userId', {
                    userId,
                })
                    .getOne();
                if (!userSearchHistory)
                    return null;
                return userSearchHistory;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.searchHistoryService = new SearchHistoryService();
