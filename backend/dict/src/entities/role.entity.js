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
exports.Role = void 0;
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
/**
 * @openapi
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *          - name
 *       properties:
 *          name:
 *              type: string
 *          description:
 *              type: string
 *          color:
 *              type: string
 *     RoleRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 *          description:
 *              type: string
 *          color:
 *              type: string
 *          numUsers:
 *              type: integer
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
let Role = exports.Role = class Role extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        unique: true,
    }),
    (0, typeorm_1.Index)('idx_name_unique'),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Role.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: '',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Role.prototype, "numUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.roles, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Role.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Role.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], Role.prototype, "updatedAt", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)('roles')
], Role);
