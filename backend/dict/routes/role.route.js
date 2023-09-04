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
router.route('/get-all').get(controllers_1.roleController.getAll);
router.route('/').get(controllers_1.roleController.getAllRoles).post(controllers_1.roleController.createRole);
router
    .route('/:roleId')
    .get(controllers_1.roleController.getRole)
    .put(controllers_1.roleController.updateRole)
    .delete(controllers_1.roleController.deleteRole);
exports.default = router;
