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
exports.authMiddleware = void 0;
const consts_1 = require("../consts");
const enums_1 = require("../enums");
const services_1 = require("../services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get token
                const bearer = req.headers['authorization'];
                if (!bearer) {
                    res.status(enums_1.StatusCode.FORBIDDEN).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: "You don't login.",
                    });
                    return;
                }
                const token = bearer.split(' ')[1];
                if (!token) {
                    res.status(enums_1.StatusCode.FORBIDDEN).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: "You don't login.",
                    });
                    return;
                }
                // verify token
                const decode = services_1.authService.verifyToken(token);
                // check user
                const user = yield services_1.userService.getByIdNoRelations(Number(decode.id));
                if (!user) {
                    res.status(enums_1.StatusCode.UNAUTHORIZED).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Unauthorized.',
                    });
                    return;
                }
                // next
                req.user = user;
                next();
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                    res.status(enums_1.StatusCode.UNAUTHORIZED).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'JWT expired.',
                    });
                }
                else {
                    res.status(enums_1.StatusCode.ERROR).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.ERROR,
                        message: error.message,
                    });
                }
            }
        });
    }
    rolePermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield services_1.authService.getByEmail(req.body.emailAddress);
                const checkAdmin = user === null || user === void 0 ? void 0 : user.roles.map((r) => r.id).find((id) => consts_1.ROLES.includes(id));
                if (checkAdmin) {
                    next();
                }
                else {
                    res.status(403).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.ERROR,
                        message: "You don't have permission",
                    });
                }
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
exports.authMiddleware = new AuthMiddleware();
