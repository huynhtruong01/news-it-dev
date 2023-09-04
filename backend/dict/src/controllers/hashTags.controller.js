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
exports.hashTagController = void 0;
const enums_1 = require("../enums");
const services_1 = require("../services");
// check name hash tag
const checkDuplicateName = (name, res, id) => __awaiter(void 0, void 0, void 0, function* () {
    const checkName = yield services_1.hashTagService.checkNameHashTag(name);
    if (checkName) {
        if (checkName.id === id)
            return true;
        res.status(enums_1.StatusCode.BAD_REQUEST).json({
            results: enums_1.Results.ERROR,
            status: enums_1.StatusText.FAILED,
            message: `${name} is exits. Choose another name.`,
        });
        return null;
    }
    return true;
});
class HashTagController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTags = yield services_1.hashTagService.getAll();
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        hashTags,
                    },
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
    // (GET)
    getAllHashTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const [hashTags, count] = yield services_1.hashTagService.getAllByParams(query);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        hashTags,
                        total: count,
                    },
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
    // (GET)
    getHashTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = yield services_1.hashTagService.getById(Number(req.params.hashTagId));
                if (!hashTag) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this hash tag.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        hashTag,
                    },
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
    getHashTagByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = yield services_1.hashTagService.getByName(req.params.hashTagName);
                if (!hashTag) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this hash tag.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        hashTag,
                    },
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
    // create (POST)
    createHashTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield checkDuplicateName(req.body.name, res)))
                    return;
                const newHashTag = yield services_1.hashTagService.create(req.body);
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        hashTag: newHashTag,
                    },
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
    // update (PUT)
    updateHashTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield checkDuplicateName(req.body.name, res, Number(req.params.hashTagId))))
                    return;
                const newHashTag = yield services_1.hashTagService.update(req.body);
                if (!newHashTag) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this hash tag to update.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        hashTag: newHashTag,
                    },
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
    // delete (DELETE)
    deleteHashTag(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashTag = yield services_1.hashTagService.delete(Number(req.params.hashTagId));
                if (!hashTag) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this hash tag to delete.',
                    });
                    return;
                }
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
    // TODO: user follow hash tag
    followHashTag(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                    const { hashTagId } = req.params;
                    yield services_1.hashTagService.follow(Number(req.user.id), Number(hashTagId));
                    res.status(enums_1.StatusCode.SUCCESS).json({
                        results: enums_1.Results.SUCCESS,
                        status: enums_1.StatusText.SUCCESS,
                        data: {
                            message: 'Follow hash tag success.',
                        },
                    });
                    return;
                }
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.FAILED,
                    data: {
                        message: 'Follow hash tag failed.',
                    },
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
    // TODO: unfollow hash tag
    unFollowHashTag(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                    const { hashTagId } = req.params;
                    yield services_1.hashTagService.unfollow(Number(req.user.id), Number(hashTagId));
                    res.status(enums_1.StatusCode.SUCCESS).json({
                        results: enums_1.Results.SUCCESS,
                        status: enums_1.StatusText.SUCCESS,
                        data: {
                            message: 'Unfollow hash tag success.',
                        },
                    });
                    return;
                }
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.FAILED,
                    message: 'Unfollow hash tag failed.',
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
exports.hashTagController = new HashTagController();
