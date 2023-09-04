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
exports.searchHistoryController = void 0;
const enums_1 = require("../enums");
const services_1 = require("../services");
class SearchHistoryController {
    createSearchHistory(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existUserSearchHistory = yield services_1.searchHistoryService.getBySearchQuery(req.body.searchQuery, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                // extract duplicate search query
                if (existUserSearchHistory) {
                    res.status(enums_1.StatusCode.DELETED).json({
                        results: enums_1.Results.SUCCESS,
                        status: enums_1.StatusText.SUCCESS,
                        data: null,
                    });
                    return;
                }
                yield services_1.searchHistoryService.create(req.body);
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
}
exports.searchHistoryController = new SearchHistoryController();
