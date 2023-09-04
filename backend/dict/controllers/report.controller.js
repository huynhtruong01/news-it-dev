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
exports.reportController = void 0;
const enums_1 = require("../enums");
const services_1 = require("../services");
class ReportController {
    // get all reports
    getAllReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const [reports, count] = yield services_1.reportService.getAll(query);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        reports,
                        total: count,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // create report
    createReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield services_1.reportService.create(req.body);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        report,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // delete report
    deleteReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const report = yield services_1.reportService.delete(Number(req.params.reportId));
                if (!report) {
                    res.status(enums_1.StatusCode.ERROR).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.ERROR,
                        message: 'Not found report to delete',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.DELETED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: null,
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
}
exports.reportController = new ReportController();
