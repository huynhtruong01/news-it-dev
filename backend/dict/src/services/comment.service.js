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
exports.commentService = void 0;
const config_1 = require("../config");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
const server_1 = require("../server");
const services_1 = require("../services");
const utils_1 = require("../utils");
class CommentService {
    constructor(commentRepository = config_1.AppDataSource.getRepository(entities_1.Comment) // private userRepository = AppDataSource.getRepository(User)
    ) {
        this.commentRepository = commentRepository;
    }
    // ----------------------- CHECKING -------------------------------
    checkIncludesUser(comment, user) {
        var _a;
        return !!((_a = comment.likes) === null || _a === void 0 ? void 0 : _a.find((u) => u.id === user.id));
    }
    // --------------------- SERVICES -----------------------------------
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { take, skip } = (0, utils_1.paginationQuery)(query);
                const queryBuilder = this.commentRepository
                    .createQueryBuilder('comment')
                    .leftJoinAndSelect('comment.parentComment', 'parentComment')
                    .leftJoinAndSelect('comment.childrenComments', 'childrenComments')
                    .leftJoinAndSelect('childrenComments.user', 'userComment')
                    .leftJoinAndSelect('childrenComments.news', 'newsComment')
                    .leftJoinAndSelect('childrenComments.likes', 'likesComment')
                    .leftJoinAndSelect('childrenComments.replyUser', 'replyUser')
                    .leftJoinAndSelect('comment.news', 'news')
                    .leftJoinAndSelect('comment.user', 'user')
                    .leftJoinAndSelect('comment.likes', 'likes')
                    .orderBy('comment.createdAt', query.createdAt || enums_1.Order.DESC)
                    .where('comment.parentCommentId IS NULL');
                if (query.newsId) {
                    queryBuilder.andWhere('comment.newsId = :newsId', {
                        newsId: query.newsId,
                    });
                }
                const [comments, count] = yield queryBuilder
                    .take(take)
                    .skip(skip)
                    .getManyAndCount();
                return [comments, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // create
    create(data, user, noNotify = false) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = (0, utils_1.createComment)(data);
                comment.user = user;
                // create slug
                const slug = services_1.commonService.generateSlug(comment.comment);
                comment.slug = slug;
                comment.childrenComments = [];
                comment.likes = [];
                const newComment = yield this.commentRepository.save(comment);
                newComment.news = (yield services_1.newsService.increaseNums(data.newsId, 'numComments'));
                if (!noNotify) {
                    server_1.io.to((_a = newComment.news) === null || _a === void 0 ? void 0 : _a.slug).emit('createComment', newComment);
                }
                return newComment;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // reply
    reply(data, user) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parentComment = yield this.getById(data.parentCommentId);
                if (!parentComment)
                    return null;
                const replyComment = yield this.create(data, user, true);
                if (data.replyUserId) {
                    replyComment.replyUser = (yield services_1.userService.getByIdNoRelations(data.replyUserId));
                }
                (_a = parentComment.childrenComments) === null || _a === void 0 ? void 0 : _a.push(replyComment);
                const newParentComment = yield this.commentRepository.save(parentComment);
                server_1.io.to((_b = replyComment === null || replyComment === void 0 ? void 0 : replyComment.news) === null || _b === void 0 ? void 0 : _b.slug).emit('replyComment', newParentComment);
                return newParentComment;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.commentRepository
                    .createQueryBuilder('comment')
                    .leftJoinAndSelect('comment.parentComment', 'parentComment')
                    .leftJoinAndSelect('comment.childrenComments', 'childrenComments')
                    .leftJoinAndSelect('childrenComments.user', 'userComment')
                    .leftJoinAndSelect('childrenComments.likes', 'likesComment')
                    .leftJoinAndSelect('childrenComments.replyUser', 'replyUser')
                    .leftJoinAndSelect('comment.news', 'news')
                    .leftJoinAndSelect('comment.user', 'user')
                    .leftJoinAndSelect('comment.likes', 'likes')
                    .where('comment.id = :commentId', { commentId: id })
                    .getOne();
                if (!comment)
                    return null;
                return comment;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get by id with little relation
    getByIdRelation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.commentRepository
                    .createQueryBuilder('comment')
                    .leftJoinAndSelect('comment.childrenComments', 'childrenComments')
                    .leftJoinAndSelect('comment.news', 'news')
                    .where('comment.id = :commentId', { commentId: id })
                    .getOne();
                if (!comment)
                    return null;
                return comment;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // update
    update(id, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.getById(id);
                if (!comment)
                    return null;
                const newComment = yield this.commentRepository.save(Object.assign(Object.assign({}, comment), data));
                server_1.io.to((_a = newComment.news) === null || _a === void 0 ? void 0 : _a.slug).emit('updateComment', newComment);
                return newComment;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // update reply
    updateReply(id, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (id) {
                    const comment = yield this.getById(id);
                    if (!comment)
                        return null;
                    const index = comment.childrenComments.findIndex((c) => c.id === data.id);
                    if (index > -1) {
                        ;
                        comment.childrenComments[index] = data;
                        yield this.commentRepository.save(data);
                    }
                    const newComment = yield this.commentRepository.save(comment);
                    server_1.io.to((_a = newComment.news) === null || _a === void 0 ? void 0 : _a.slug).emit('updateCommentReply', newComment);
                    return newComment;
                }
                return null;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // delete
    delete(id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.getByIdRelation(id);
                if (!comment)
                    return null;
                if (comment.parentCommentId) {
                    const parentComment = yield this.getByIdRelation(comment.parentCommentId);
                    if (parentComment) {
                        const newChildrenComments = (_a = parentComment.childrenComments) === null || _a === void 0 ? void 0 : _a.filter((c) => c.id !== comment.id);
                        parentComment.childrenComments = newChildrenComments;
                        yield this.commentRepository.save(parentComment);
                    }
                }
                server_1.io.to((_b = comment.news) === null || _b === void 0 ? void 0 : _b.slug).emit('deleteComment', comment);
                yield this.commentRepository.delete(id);
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // like
    like(id, user) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.commentRepository
                    .createQueryBuilder('comment')
                    .leftJoinAndSelect('comment.likes', 'likes')
                    .leftJoinAndSelect('comment.parentComment', 'parentComment')
                    .leftJoinAndSelect('comment.news', 'news')
                    .where('comment.id = :commentId', { commentId: id })
                    .getOne();
                if (!comment)
                    return null;
                comment.user = user;
                const isIncludesUser = this.checkIncludesUser(comment, user);
                if (isIncludesUser)
                    throw new Error(`User ${user.username} liked this comment to like.`);
                (_a = comment.likes) === null || _a === void 0 ? void 0 : _a.push(user);
                if (comment.parentCommentId) {
                    const parentComment = yield this.getByIdRelation(comment.parentCommentId);
                    if (parentComment) {
                        parentComment.childrenComments = (_b = parentComment.childrenComments) === null || _b === void 0 ? void 0 : _b.map((c) => {
                            if (c.id === comment.id)
                                return Object.assign({}, comment);
                            return c;
                        });
                        yield this.commentRepository.save(parentComment);
                    }
                }
                const newComment = yield this.commentRepository.save(Object.assign({}, comment));
                server_1.io.to((_c = comment.news) === null || _c === void 0 ? void 0 : _c.slug).emit('likeComment', newComment);
                return newComment;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // unlike
    unlike(id, user) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield this.commentRepository
                    .createQueryBuilder('comment')
                    .leftJoinAndSelect('comment.likes', 'likes')
                    .leftJoinAndSelect('comment.parentComment', 'parentComment')
                    .leftJoinAndSelect('comment.news', 'news')
                    .where('comment.id = :commentId', { commentId: id })
                    .getOne();
                if (!comment)
                    return null;
                comment.user = user;
                const isIncludesUser = this.checkIncludesUser(comment, user);
                if (!isIncludesUser)
                    throw new Error(`User ${user.username} didn't like this comment to unlike.`);
                comment.likes = (_a = comment.likes) === null || _a === void 0 ? void 0 : _a.filter((u) => u.id !== user.id);
                if (comment.parentCommentId) {
                    const parentComment = yield this.getByIdRelation(comment.parentCommentId);
                    if (parentComment) {
                        parentComment.childrenComments = (_b = parentComment.childrenComments) === null || _b === void 0 ? void 0 : _b.map((c) => {
                            if (c.id === comment.id)
                                return comment;
                            return c;
                        });
                        yield this.commentRepository.save(parentComment);
                    }
                }
                const newComment = yield this.commentRepository.save(comment);
                server_1.io.to((_c = comment.news) === null || _c === void 0 ? void 0 : _c.slug).emit('unlikeComment', newComment);
                return newComment;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.commentService = new CommentService();
