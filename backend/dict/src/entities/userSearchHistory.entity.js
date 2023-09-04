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
exports.UserSearchHistory = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @openapi
 * components:
 *   schemas:
 *     UserSearchHistory:
 *       type: object
 *       required:
 *          - userId
 *       properties:
 *          userId:
 *              type: integer
 *          searchQuery:
 *              type: string
 *     UserSearchHistoryRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          userId:
 *              type: integer
 *          searchQuery:
 *              type: string
 *          user:
 *              $ref: '#/components/schemas/UserRes'
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 */
let UserSearchHistory = exports.UserSearchHistory = class UserSearchHistory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserSearchHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], UserSearchHistory.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], UserSearchHistory.prototype, "searchQuery", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, (user) => user.searchHistory, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", entities_1.User)
], UserSearchHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], UserSearchHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], UserSearchHistory.prototype, "updatedAt", void 0);
exports.UserSearchHistory = UserSearchHistory = __decorate([
    (0, typeorm_1.Entity)('user_search_history'),
    (0, typeorm_1.Entity)()
], UserSearchHistory);
