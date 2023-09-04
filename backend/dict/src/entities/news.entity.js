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
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
/**
 * @openapi
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *        - userId
 *        - title
 *        - content
 *        - thumbnailImage
 *        - coverImage
 *        - readTimes
 *       properties:
 *         title:
 *           type: string
 *         sapo:
 *           type: string
 *         content:
 *           type: string
 *         thumbnailImage:
 *           type: number
 *         coverImage:
 *           type: string
 *         newsViews:
 *           type: integer
 *         numLikes:
 *           type: integer
 *         numComments:
 *           type: integer
 *         numSaves:
 *           type: integer
 *         numReport:
 *           type: integer
 *         status:
 *           type: string
 *         readTimes:
 *           type: integer
 *         slug:
 *           type: string
 *         hashTagIds:
 *           type: array
 *           items:
 *              type: number
 *     NewsRes:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         sapo:
 *           type: string
 *         content:
 *           type: string
 *         thumbnailImage:
 *           type: string
 *         coverImage:
 *           type: string
 *         newsViews:
 *           type: integer
 *         numLikes:
 *           type: integer
 *         numComments:
 *           type: integer
 *         numSaves:
 *           type: integer
 *         numReport:
 *           type: integer
 *         status:
 *           type: string
 *         readTimes:
 *           type: integer
 *         slug:
 *           type: string
 *         hashTagIds:
 *           type: array
 *           items:
 *              type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         likes:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/UserLike'
 *         hashTags:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/HashTag'
 *         saveUsers:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/User'
 *         comments:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Comment'
 *         notifications:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Notify'
 *         reporterNews:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Report'
 *         user:
 *           $ref: '#/components/schemas/User'
 */
let News = exports.News = class News extends typeorm_1.BaseEntity {
    countSaves() {
        this.numSaves = this.saveUsers ? this.saveUsers.length : 0;
    }
    countLikes() {
        this.numLikes = this.likes ? this.likes.length : 0;
    }
    countComments() {
        this.numComments = this.comments ? this.comments.length : 0;
    }
    countReport() {
        this.numReport = this.reporterNews ? this.reporterNews.length : 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], News.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'number',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], News.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], News.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], News.prototype, "sapo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], News.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], News.prototype, "newsViews", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], News.prototype, "numLikes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], News.prototype, "numComments", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], News.prototype, "numSaves", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], News.prototype, "numReport", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.UserLike, (userLike) => userLike.news, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], News.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.UserSave, (userSave) => userSave.news, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], News.prototype, "saveUsers", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.NewsStatus,
        default: enums_1.NewsStatus.DRAFT,
    }),
    __metadata("design:type", String)
], News.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], News.prototype, "thumbnailImage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], News.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, (user) => user.news, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'userId',
    }),
    __metadata("design:type", entities_1.User)
], News.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_1.HashTag, (hashTag) => hashTag.news, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'news_hash_tags_hash_tags',
        joinColumn: { name: 'newsId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], News.prototype, "hashTags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Comment, (comment) => comment.news, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], News.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Notify, (notify) => notify.news, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], News.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Report, (report) => report.reportNews),
    __metadata("design:type", Array)
], News.prototype, "reporterNews", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], News.prototype, "readTimes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], News.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
    }),
    __metadata("design:type", Array)
], News.prototype, "hashTagIds", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], News.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], News.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], News.prototype, "countSaves", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], News.prototype, "countLikes", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], News.prototype, "countComments", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], News.prototype, "countReport", null);
exports.News = News = __decorate([
    (0, typeorm_1.Entity)('news')
], News);
