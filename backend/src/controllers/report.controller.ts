import { Results, StatusCode, StatusText } from '@/enums'
import { IObjectCommon, RequestUser } from '@/models'
import { reportService } from '@/services'
import { Response } from 'express'

class ReportController {
    // get all reports
    async getAllReports(req: RequestUser, res: Response) {
        try {
            const query = req.query as IObjectCommon
            const [reports, count] = await reportService.getAll(query)

            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    reports,
                    total: count,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // create report
    async createReport(req: RequestUser, res: Response) {
        try {
            const report = await reportService.create(req.body)
            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    report,
                },
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }

    // delete report
    async deleteReport(req: RequestUser, res: Response) {
        try {
            const report = await reportService.delete(Number(req.params.reportId))
            if (!report) {
                res.status(StatusCode.ERROR).json({
                    results: Results.ERROR,
                    status: StatusText.ERROR,
                    message: 'Not found report to delete',
                })
                return
            }
            res.status(StatusCode.DELETED).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: null,
            })
        } catch (error) {
            res.status(StatusCode.ERROR).json({
                results: Results.ERROR,
                status: StatusText.ERROR,
                message: (error as Error).message,
            })
        }
    }
}

export const reportController = new ReportController()
