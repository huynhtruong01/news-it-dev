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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const news_entity_1 = require("../entities/news.entity");
const comment_entity_1 = require("../entities/comment.entity");
const role_entity_1 = require("../entities/role.entity");
const hashTag_entity_1 = require("../entities/hashTag.entity");
const notify_entity_1 = require("../entities/notify.entity");
let User = User_1 = class User extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        unique: true,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "emailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], User.prototype, "dateJoined", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], User.prototype, "newsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "websiteUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "currentlyLearning", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "skillLanguages", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "education", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "work", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '#ffffff',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "bandingColor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], User.prototype, "numFollowers", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], User.prototype, "numFollowing", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], User.prototype, "numNewsLike", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], User.prototype, "numNewsSaves", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
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
    (0, typeorm_1.ManyToMany)(() => User_1, (user) => user.followers, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'users_followers_users',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userFollowId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, (user) => user.following, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'users_following_users',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userFollowedId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => news_entity_1.News, (news) => news.likes, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'users_news_likes_news',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'newsId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], User.prototype, "newsLikes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => news_entity_1.News, (news) => news.saveUsers, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'users_saves_news',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'newsId', referencedColumnName: 'id' },
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
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], User.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], User.prototype, "updatedAt", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
exports.User = User;
