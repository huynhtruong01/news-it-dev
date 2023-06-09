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
exports.commentController = void 0;
const enums_1 = require("../enums");
const services_1 = require("../services");
class CommentController {
    // get all comments (GET)
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [comments, total] = yield services_1.commentService.getAll(req.query);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        comments,
                        total,
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
    // create comment (POST)
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield services_1.commentService.create(req.body);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        comment,
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
    replyComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield services_1.commentService.reply(req.body);
                if (!comment) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found comment to reply.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        comment,
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
    // update comment (PUT)
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield services_1.commentService.update(Number(req.params.commentId), req.body);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        comment,
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
    updateReplyComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield services_1.commentService.updateReply(Number(req.params.commentId), req.body);
                if (!comment) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found comment to update reply.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        comment,
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
    // delete comment (DELETE)
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield services_1.commentService.getById(Number(req.params.commentId));
                if (!comment) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found comment to delete.',
                    });
                    return;
                }
                yield services_1.commentService.delete(comment.id);
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
    // like comment (GET)
    likeComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield services_1.commentService.like(Number(req.params.commentId), Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                if (!comment) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found comment to like.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        message: 'Like comment success.',
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
    // unlike comment (GET)
    unlikeComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield services_1.commentService.unlike(Number(req.params.commentId), Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id));
                if (!comment) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found comment to unlike.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        message: 'Unlike comment success.',
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
}
exports.commentController = new CommentController();
