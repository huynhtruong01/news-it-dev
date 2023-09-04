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
exports.userController = void 0;
const enums_1 = require("../enums");
const services_1 = require("../services");
const common_enum_1 = require("../enums/common.enum");
class UserController {
    getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const [users, count] = yield services_1.userService.getAll(query);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: common_enum_1.StatusText.SUCCESS,
                    data: {
                        users,
                        total: count,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // get all user suggestion (GET)
    getAllUserSuggestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield services_1.userService.getAllSuggestion(req.user);
                res.status(200).json({
                    results: enums_1.Results.SUCCESS,
                    status: common_enum_1.StatusText.SUCCESS,
                    data: {
                        users,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // get top users
    getTopUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield services_1.userService.getTopFollowers();
                const newUser = users.map((u) => ({
                    id: u.id,
                    username: u.username,
                    lastName: u.lastName,
                    firstName: u.firstName,
                    numFollowers: u.numFollowers,
                }));
                res.status(200).json({
                    results: enums_1.Results.SUCCESS,
                    status: common_enum_1.StatusText.SUCCESS,
                    data: {
                        users: newUser,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // get user by id (GET)
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield services_1.userService.getById(Number(req.params.userId));
                if (!user) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: common_enum_1.StatusText.FAILED,
                        message: 'Not found this user.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: common_enum_1.StatusText.SUCCESS,
                    data: {
                        user,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // get by username (GET)
    getUserByUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield services_1.userService.getByUsername(req.params.userName, true);
                if (!user) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: common_enum_1.StatusText.FAILED,
                        message: 'Not found this user by username.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: common_enum_1.StatusText.SUCCESS,
                    data: {
                        user,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // add user (POST)
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check email has exits
                const { emailAddress, username } = req.body;
                const isEmailExits = yield services_1.authService.checkEmailOrUsername(emailAddress);
                const isUsernameExits = yield services_1.authService.checkEmailOrUsername(username);
                // check username has exits
                if (isEmailExits || isUsernameExits) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: common_enum_1.StatusText.FAILED,
                        message: 'Email or username already exits.',
                    });
                    return;
                }
                // create user
                const user = yield services_1.userService.create(req.body);
                user.password = undefined;
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: common_enum_1.StatusText.SUCCESS,
                    data: {
                        user,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // update user by id (PUT)
    updateUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield services_1.userService.update(Number(req.params.userId), Object.assign(Object.assign({}, req.body), { id: Number(req.params.userId) }));
                if (!newUser) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: common_enum_1.StatusText.FAILED,
                        message: 'Not found this user to update.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: common_enum_1.StatusText.SUCCESS,
                    data: {
                        user: newUser,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // delete user by id (DELETE)
    deleteUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield services_1.userService.delete(Number(req.params.userId));
                if (!user) {
                    res.status(enums_1.StatusCode.UNAUTHORIZED).json({
                        results: enums_1.Results.ERROR,
                        status: common_enum_1.StatusText.FAILED,
                        message: 'Not found this user to delete.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.DELETED).json({
                    results: enums_1.Results.SUCCESS,
                    status: common_enum_1.StatusText.SUCCESS,
                    data: null,
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // TODO: get profile user (GET)
    getProfile(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                    const user = yield services_1.userService.getById((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
                    res.status(enums_1.StatusCode.SUCCESS).json({
                        results: enums_1.Results.SUCCESS,
                        status: common_enum_1.StatusText.SUCCESS,
                        data: {
                            user,
                        },
                    });
                    return;
                }
                res.status(enums_1.StatusCode.NOT_FOUND).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.FAILED,
                    message: 'Not founded this user.',
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    getProfileSaveFilters(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                    const user = yield services_1.userService.getFilterSaves(Number(req.params.userId), req.query);
                    res.status(enums_1.StatusCode.SUCCESS).json({
                        results: enums_1.Results.SUCCESS,
                        status: common_enum_1.StatusText.SUCCESS,
                        data: {
                            user,
                        },
                    });
                    return;
                }
                res.status(enums_1.StatusCode.NOT_FOUND).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.FAILED,
                    message: 'Not founded this user.',
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // TODO: update profile user (PUT)
    updateProfileUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                    const user = yield services_1.userService.updateProfile(Number(req.user.id), req.body);
                    if (!user) {
                        res.status(enums_1.StatusCode.NOT_FOUND).json({
                            results: enums_1.Results.ERROR,
                            status: common_enum_1.StatusText.FAILED,
                            message: 'Not found this user to update profile.',
                        });
                        return;
                    }
                    res.status(enums_1.StatusCode.SUCCESS).json({
                        results: enums_1.Results.SUCCESS,
                        status: common_enum_1.StatusText.SUCCESS,
                        data: {
                            user,
                        },
                    });
                }
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // TODO: follow user
    followUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                    yield services_1.userService.follow(req.user.id, Number(req.params.userId));
                    res.status(enums_1.StatusCode.SUCCESS).json({
                        results: enums_1.Results.SUCCESS,
                        status: common_enum_1.StatusText.SUCCESS,
                        data: {
                            message: 'Follow success.',
                        },
                    });
                    return;
                }
                res.status(enums_1.StatusCode.BAD_REQUEST).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.FAILED,
                    message: 'Follow failed.',
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // TODO: unfollow user
    unfollowUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                    yield services_1.userService.unfollow(req.user.id, Number(req.params.userId));
                    res.status(enums_1.StatusCode.SUCCESS).json({
                        results: enums_1.Results.SUCCESS,
                        status: common_enum_1.StatusText.SUCCESS,
                        data: {
                            message: 'UnFollow success.',
                        },
                    });
                    return;
                }
                res.status(enums_1.StatusCode.BAD_REQUEST).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.FAILED,
                    message: 'Follow failed.',
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: common_enum_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
}
exports.userController = new UserController();
