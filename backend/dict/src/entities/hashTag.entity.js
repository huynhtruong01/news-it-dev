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
exports.HashTag = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const news_entity_1 = require("../entities/news.entity");
/**
 * @openapi
 * components:
 *   schemas:
 *     HashTag:
 *       type: object
 *       required:
 *          - name
 *          - title
 *       properties:
 *          name:
 *              type: string
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          color:
 *              type: string
 *          iconImage:
 *              type: string
 *     HashTagRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          color:
 *              type: string
 *          iconImage:
 *              type: string
 *          numNews:
 *              type: integer
 *          numUsers:
 *              type: integer
 *          news:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/NewsRes'
 *          users:
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
let HashTag = exports.HashTag = class HashTag extends typeorm_1.BaseEntity {
    countNews() {
        this.numNews = this.news ? this.news.length : 0;
    }
    countUsers() {
        this.numUsers = this.users ? this.users.length : 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HashTag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        unique: true,
    }),
    (0, typeorm_1.Index)('idx_name_hashTags_unique'),
    __metadata("design:type", String)
], HashTag.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        unique: true,
    }),
    (0, typeorm_1.Index)('idx_hashTags_title_unique'),
    __metadata("design:type", String)
], HashTag.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], HashTag.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        unique: true,
    }),
    (0, typeorm_1.Index)('idx_name_hashTags_color_unique'),
    __metadata("design:type", String)
], HashTag.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    __metadata("design:type", String)
], HashTag.prototype, "iconImage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], HashTag.prototype, "numNews", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], HashTag.prototype, "numUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.hashTags, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'hash_tags_users_users',
        joinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], HashTag.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => news_entity_1.News, (news) => news.hashTags, {
        onDelete: 'CASCADE',
    })
    // @JoinTable({
    //     name: 'news_hash_tags_hash_tags',
    //     joinColumn: { name: 'hashTagId', referencedColumnName: 'id' },
    //     inverseJoinColumn: { name: 'newsId', referencedColumnName: 'id' },
    // })
    ,
    __metadata("design:type", Array)
], HashTag.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], HashTag.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], HashTag.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], HashTag.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HashTag.prototype, "countNews", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HashTag.prototype, "countUsers", null);
exports.HashTag = HashTag = __decorate([
    (0, typeorm_1.Entity)('hash_tags')
], HashTag);
