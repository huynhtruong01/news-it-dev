"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const news_entity_1 = require("../entities/news.entity");
const user_entity_1 = require("../entities/user.entity");
/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *          - userId
 *          - newsId
 *          - comment
 *       properties:
 *          userId:
 *              type: integer
 *          replyUserId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          parentCommentId:
 *              oneOf:
 *                  - type: integer
 *                  - type: null
 *              nullable: true
 *          comment:
 *              type: string
 *     CommentRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          userId:
 *              type: integer
 *          replyUserId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          parentCommentId:
 *              oneOf:
 *                  - type: integer
 *                  - type: null
 *              nullable: true
 *          comment:
 *              type: string
 *          numLikes:
 *              type: integer
 *          numReplyComments:
 *              type: integer
 *          parentComment:
 *              $ref: '#/components/schemas/CommentRes'
 *          childrenComments:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/CommentRes'
 *          news:
 *              $ref: '#/components/schemas/NewsRes'
 *          user:
 *              $ref: '#/components/schemas/UserRes'
 *          replyUser:
 *              $ref: '#/components/schemas/UserRes'
 *          likes:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/UserRes'
 *          slug:
 *              type: string
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 */
let Comment = exports.Comment = Comment_1 = class Comment extends typeorm_1.BaseEntity {
    countUsers() {
        this.numLikes = this.likes ? this.likes.length : 0;
    }
    countReplyComments() {
        this.numReplyComments = this.childrenComments ? this.childrenComments.length : 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Comment.prototype, "replyUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Comment.prototype, "newsId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Comment.prototype, "parentCommentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Comment_1, (comment) => comment.childrenComments, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parentCommentId' }),
    __metadata("design:type", Comment)
], Comment.prototype, "parentComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1, (comment) => comment.parentComment, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Comment.prototype, "childrenComments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => news_entity_1.News, (news) => news.comments, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'newsId' }),
    __metadata("design:type", news_entity_1.News)
], Comment.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.comments, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.replyComments, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'replyUserId' }),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "replyUser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Comment.prototype, "numLikes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Comment.prototype, "numReplyComments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.commentLikes, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'user_comment_likes',
        joinColumn: { name: 'commentId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Comment.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Comment.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Comment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], Comment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Comment.prototype, "countUsers", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Comment.prototype, "countReplyComments", null);
exports.Comment = Comment = Comment_1 = __decorate([
    (0, typeorm_1.Entity)('comments')
], Comment);
