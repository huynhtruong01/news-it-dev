"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportService = void 0;
const config_1 = require("../config");
const entities_1 = require("../entities");
const utils_1 = require("../utils");
class ReportService {
    constructor(reportRepository = config_1.AppDataSource.getRepository(entities_1.Report)) {
        this.reportRepository = reportRepository;
    }
    // get all
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { take, skip } = (0, utils_1.paginationQuery)(query);
                const queryBuilder = this.reportRepository
                    .createQueryBuilder('report')
                    .leftJoinAndSelect('report.reporter', 'reporter')
                    .leftJoinAndSelect('report.reportNews', 'reportNews');
                if (query.newsId) {
                    queryBuilder.where('report.newsId = :newsId', {
                        newsId: query.newsId,
                    });
                }
                const [reports, count] = yield queryBuilder
                    .take(take)
                    .skip(skip)
                    .getManyAndCount();
                return [reports, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get all by newsId
    getAllByNewsId(newsId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [reports, count] = yield this.reportRepository
                    .createQueryBuilder('report')
                    .leftJoinAndSelect('report.reporter', 'reporter')
                    .leftJoinAndSelect('report.reportNews', 'reportNews')
                    .where('report.newsId = :newsId', {
                    newsId,
                })
                    .getManyAndCount();
                return [reports, count];
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // create
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = (0, utils_1.createReport)(data);
                const newReport = yield this.reportRepository.save(report);
                return newReport;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // delete
    delete(reportId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield this.reportRepository
                    .createQueryBuilder('report')
                    .where('report.id = :reportId', { reportId })
                    .getOne();
                if (!report)
                    return null;
                yield report.remove();
                return report;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // delete many
    deleteMany(reportIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reportsDelete = yield this.reportRepository
                    .createQueryBuilder('report')
                    .where('report.id IN (:...ids)', { ids: reportIds })
                    .getMany();
                if (reportsDelete.length !== reportIds.length)
                    throw new Error("Can't delete many report");
                yield this.reportRepository.delete(reportIds);
                return true;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.reportService = new ReportService();
