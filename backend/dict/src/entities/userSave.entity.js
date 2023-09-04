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
exports.UserSave = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @openapi
 * components:
 *   schemas:
 *     UserSave:
 *       type: object
 *       required:
 *          - userId
 *          - newsId
 *       properties:
 *          saved:
 *              type: boolean
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *     UserSaveRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          saved:
 *              type: boolean
 *          userId:
 *              type: integer
 *          newsId:
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
let UserSave = exports.UserSave = class UserSave extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserSave.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], UserSave.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], UserSave.prototype, "newsId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], UserSave.prototype, "saved", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, (user) => user.saves, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", entities_1.User)
], UserSave.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.News, (news) => news.saveUsers, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'newsId' }),
    __metadata("design:type", entities_1.News)
], UserSave.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], UserSave.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], UserSave.prototype, "updatedAt", void 0);
exports.UserSave = UserSave = __decorate([
    (0, typeorm_1.Entity)('user_save')
], UserSave);
