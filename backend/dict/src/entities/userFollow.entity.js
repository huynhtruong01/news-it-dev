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
exports.UserFollow = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @openapi
 * components:
 *   schemas:
 *     UserFollow:
 *       type: object
 *       required:
 *          - userId
 *          - followerId
 *       properties:
 *          userId:
 *              type: integer
 *          followerId:
 *              type: integer
 *     UserFollowRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          userId:
 *              type: integer
 *          followerId:
 *              type: integer
 *          user:
 *              $ref: '#/components/schemas/UserRes'
 *          news:
 *              $ref: '#/components/schemas/NewsRes'
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 */
let UserFollow = exports.UserFollow = class UserFollow extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserFollow.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], UserFollow.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], UserFollow.prototype, "followerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, (user) => user.following, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", entities_1.User)
], UserFollow.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, (user) => user.followers, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'followerId' }),
    __metadata("design:type", entities_1.User)
], UserFollow.prototype, "follower", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], UserFollow.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], UserFollow.prototype, "updatedAt", void 0);
exports.UserFollow = UserFollow = __decorate([
    (0, typeorm_1.Entity)('user_follow')
], UserFollow);
