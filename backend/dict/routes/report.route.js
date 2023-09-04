"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(middlewares_1.authMiddleware.getUser);
router.route('/').get(controllers_1.reportController.getAllReports).post(controllers_1.reportController.createReport);
router.route('/:reportId').delete(controllers_1.reportController.deleteReport);
exports.default = router;
