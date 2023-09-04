"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const searchHistory_controller_1 = require("../controllers/searchHistory.controller");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(middlewares_1.authMiddleware.getUser);
router.route('/').post(searchHistory_controller_1.searchHistoryController.createSearchHistory);
exports.default = router;
