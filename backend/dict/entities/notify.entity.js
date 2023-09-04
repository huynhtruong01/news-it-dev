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
exports.Notify = void 0;
const enums_1 = require("../enums");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Notify = exports.Notify = class Notify extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notify.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Notify.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Object)
], Notify.prototype, "newsId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Notify.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Notify.prototype, "commentText", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.NotifyType,
        default: enums_1.NotifyType.DEFAULT,
    }),
    __metadata("design:type", String)
], Notify.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
    }),
    __metadata("design:type", Array)
], Notify.prototype, "readUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => _1.User, (user) => user.notificationsReceived, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", Array)
], Notify.prototype, "recipients", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.User, (user) => user.notifications, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", _1.User)
], Notify.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.News, (news) => news.notifications, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'newsId' }),
    __metadata("design:type", Object)
], Notify.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Notify.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], Notify.prototype, "updatedAt", void 0);
exports.Notify = Notify = __decorate([
    (0, typeorm_1.Entity)('notifies')
], Notify);
