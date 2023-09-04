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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const news_entity_1 = require("../entities/news.entity");
const comment_entity_1 = require("../entities/comment.entity");
const role_entity_1 = require("../entities/role.entity");
const hashTag_entity_1 = require("../entities/hashTag.entity");
const notify_entity_1 = require("../entities/notify.entity");
const consts_1 = require("../consts");
const entities_1 = require("../entities");
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          - username
 *          - firstName
 *          - lastName
 *          - emailAddress
 *          - type
 *          - password
 *       properties:
 *          username:
 *              type: string
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          emailAddress:
 *              type: string
 *          type:
 *              type: string
 *          password:
 *              type: string
 *          dateJoined:
 *              type: string
 *              format: date
 *          avatar:
 *              type: string
 *          websiteUrl:
 *              type: string
 *          bio:
 *              type: string
 *          currentlyLearning:
 *              type: string
 *          skillLanguages:
 *              type: string
 *          education:
 *              type: string
 *          work:
 *              type: string
 *          bandingColor:
 *              type: string
 *          isActive:
 *              type: boolean
 *          isAdmin:
 *              type: boolean
 *     UserRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          username:
 *              type: string
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          emailAddress:
 *              type: string
 *          type:
 *              type: string
 *          password:
 *              type: string
 *          dateJoined:
 *              type: string
 *              format: date
 *          newsCount:
 *              type: integer
 *          avatar:
 *              type: string
 *          websiteUrl:
 *              type: string
 *          bio:
 *              type: string
 *          currentlyLearning:
 *              type: string
 *          skillLanguages:
 *              type: string
 *          education:
 *              type: string
 *          work:
 *              type: string
 *          bandingColor:
 *              type: string
 *          numFollowers:
 *              type: integer
 *          numFollowing:
 *              type: integer
 *          numNewsLike:
 *              type: integer
 *          numNewsSaves:
 *              type: integer
 *          numComments:
 *              type: integer
 *          isActive:
 *              type: boolean
 *          isAdmin:
 *              type: boolean
 *          slug:
 *              type: string
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 *          roles:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Role'
 *          followers:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/UserFollow'
 *          following:
 *              type: array
 *              item:
 *                  $ref: '#/components/schemas/UserFollow'
 *          saves:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/UserSave'
 *          news:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/News'
 *          newsLikes:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/News'
 *          comments:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Comment'
 *          replyComments:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Comment'
 *          hashTags:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/HashTag'
 *          commentLikes:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Comment'
 *          notificationsReceived:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Notify'
 *          notifications:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Notify'
 *          searchHistory:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/UserSearchHistory'
 *          reports:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Report'
 *     UserProfile:
 *       type: object
 *       properties:
 *          username:
 *              type: string
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          emailAddress:
 *              type: string
 *          avatar:
 *              type: string
 *          websiteUrl:
 *              type: string
 *          bio:
 *              type: string
 *          currentlyLearning:
 *              type: string
 *          skillLanguages:
 *              type: string
 *          education:
 *              type: string
 *          work:
 *              type: string
 *          bandingColor:
 *              type: string
 */
let User = exports.User = class User extends typeorm_1.BaseEntity {
    countFollowing() {
        this.numFollowing = this.following ? this.following.length : 0;
    }
    countFollowers() {
        this.numFollowers = this.followers ? this.followers.length : 0;
    }
    countNewsLikes() {
        this.numNewsLike = this.newsLikes ? this.newsLikes.length : 0;
    }
    countComment() {
        this.numComments = this.comments ? this.comments.length : 0;
    }
    countNewsSave() {
        this.numNewsSaves = this.saves ? this.saves.length : 0;
    }
    countNews() {
        this.newsCount = this.news ? this.news.length : 0;
    }
    covertRoleIds() {
        this.roleIds = this.roles ? this.roles.map((r) => r.id) : [];
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        unique: true,
    }),
    (0, typeorm_1.Index)('idx_username', ['username']),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)('idx_firstName', ['firstName']),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)('idx_lastName', ['lastName']),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        unique: true,
    }),
    (0, typeorm_1.Index)('idx_emailAddress', ['emailAddress'], { unique: true }),
    __metadata("design:type", String)
], User.prototype, "emailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)('idx_password', ['password']),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
    }),
    (0, typeorm_1.Index)('idx_dateJoined', ['dateJoined']),
    __metadata("design:type", Date)
], User.prototype, "dateJoined", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)('idx_newsCount', ['newsCount']),
    __metadata("design:type", Number)
], User.prototype, "newsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    (0, typeorm_1.Index)('idx_avatar', ['avatar']),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    (0, typeorm_1.Index)('idx_websiteUrl', ['websiteUrl']),
    __metadata("design:type", String)
], User.prototype, "websiteUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    (0, typeorm_1.Index)('idx_bio', ['bio']),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    (0, typeorm_1.Index)('idx_currentlyLearning', ['currentlyLearning']),
    __metadata("design:type", String)
], User.prototype, "currentlyLearning", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    (0, typeorm_1.Index)('idx_skillLanguages', ['skillLanguages']),
    __metadata("design:type", String)
], User.prototype, "skillLanguages", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    (0, typeorm_1.Index)('idx_education', ['education']),
    __metadata("design:type", String)
], User.prototype, "education", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    (0, typeorm_1.Index)('idx_work', ['work']),
    __metadata("design:type", String)
], User.prototype, "work", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: consts_1.DEFAULT_COLOR,
    }),
    (0, typeorm_1.Index)('idx_bandingColor', ['bandingColor']),
    __metadata("design:type", String)
], User.prototype, "bandingColor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)('idx_numFollowers', ['numFollowers']),
    __metadata("design:type", Number)
], User.prototype, "numFollowers", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)('idx_numFollowing', ['numFollowing']),
    __metadata("design:type", Number)
], User.prototype, "numFollowing", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)('idx_numNewsLike', ['numNewsLike']),
    __metadata("design:type", Number)
], User.prototype, "numNewsLike", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)('idx_numNewsSaves', ['numNewsSaves']),
    __metadata("design:type", Number)
], User.prototype, "numNewsSaves", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)('idx_numComments', ['numComments']),
    __metadata("design:type", Number)
], User.prototype, "numComments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, (role) => role.users, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'users_roles_roles',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.UserFollow, (user) => user.follower, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'followerId' }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.UserFollow, (user) => user.user, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.UserLike, (userLike) => userLike.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "newsLikes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.UserSave, (userSave) => userSave.user, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], User.prototype, "saves", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => news_entity_1.News, (news) => news.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.replyUser, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "replyComments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => hashTag_entity_1.HashTag, (hashTag) => hashTag.users, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'hash_tags_users_users',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "hashTags", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => comment_entity_1.Comment, (comment) => comment.likes, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'user_comment_likes',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'commentId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "commentLikes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => notify_entity_1.Notify, (notify) => notify.recipients, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'user_notifications_received',
        joinColumn: { name: 'userNotifyId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'notificationId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "notificationsReceived", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notify_entity_1.Notify, (notify) => notify.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.UserSearchHistory, (searchQuery) => searchQuery.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "searchHistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Report, (report) => report.reporter),
    __metadata("design:type", Array)
], User.prototype, "reports", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    (0, typeorm_1.Index)('idx_isActive', ['isActive']),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
    }),
    (0, typeorm_1.Index)('idx_isAdmin', ['isAdmin']),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)('idx_slug', ['slug']),
    __metadata("design:type", String)
], User.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
    }),
    (0, typeorm_1.Index)('idx_roleIds', ['roleIds']),
    __metadata("design:type", Array)
], User.prototype, "roleIds", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)('idx_createdAt', ['createdAt']),
    __metadata("design:type", String)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, typeorm_1.Index)('idx_updatedAt', ['updatedAt']),
    __metadata("design:type", String)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "countFollowing", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "countFollowers", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "countNewsLikes", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "countComment", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "countNewsSave", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "countNews", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "covertRoleIds", null);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
