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
exports.Report = void 0;
const enums_1 = require("../enums");
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
/**
 * @openapi
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *          - userId
 *          - newsId
 *          - reason
 *          - status
 *       properties:
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          reason:
 *              type: string
 *          status:
 *              type: string
 *              enum:
 *                  - rude or vulgar
 *                  - harassment or hate speech
 *                  - spam or copyright issue
 *                  - other
 *     ReportRes:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *          userId:
 *              type: integer
 *          newsId:
 *              type: integer
 *          reason:
 *              type: string
 *          status:
 *              type: string
 *              enum:
 *                  - rude or vulgar
 *                  - harassment or hate speech
 *                  - spam or copyright issue
 *                  - other
 *          reporter:
 *              $ref: '#/components/schemas/UserRes'
 *          reportNews:
 *              $ref: '#/components/schemas/NewsRes'
 *          createdAt:
 *              type: string
 *          updatedAt:
 *              type: string
 */
let Report = exports.Report = class Report extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Report.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Report.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Number)
], Report.prototype, "newsId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Report.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.StatusReport,
        default: enums_1.StatusReport.OTHER,
    }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.User, (user) => user.reports, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", entities_1.User)
], Report.prototype, "reporter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.News, (news) => news.reporterNews, {
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'newsId' }),
    __metadata("design:type", entities_1.News)
], Report.prototype, "reportNews", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Report.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Report.prototype, "updatedAt", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)('reports')
], Report);
