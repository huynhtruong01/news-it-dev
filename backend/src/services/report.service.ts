import { AppDataSource } from '@/config'
import { Report } from '@/entities'
import { IObjectCommon } from '@/models'
import { createReport, paginationQuery } from '@/utils'

class ReportService {
    constructor(private reportRepository = AppDataSource.getRepository(Report)) {}

    // get all
    async getAll(query: IObjectCommon) {
        try {
            const { take, skip } = paginationQuery(query)
            const queryBuilder = this.reportRepository
                .createQueryBuilder('report')
                .leftJoinAndSelect('report.reporter', 'reporter')
                .leftJoinAndSelect('report.reportNews', 'reportNews')

            if (query.newsId) {
                queryBuilder.where('report.newsId = :newsId', {
                    newsId: query.newsId,
                })
            }

            const [reports, count] = await queryBuilder
                .take(take)
                .skip(skip)
                .getManyAndCount()

            return [reports, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // get all by newsId
    async getAllByNewsId(newsId: number) {
        try {
            const [reports, count] = await this.reportRepository
                .createQueryBuilder('report')
                .leftJoinAndSelect('report.reporter', 'reporter')
                .leftJoinAndSelect('report.reportNews', 'reportNews')
                .where('report.newsId = :newsId', {
                    newsId,
                })
                .getManyAndCount()

            return [reports, count]
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // create
    async create(data: Report) {
        try {
            const report = createReport(data)
            const newReport = await this.reportRepository.save(report)
            return newReport
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // delete
    async delete(reportId: number) {
        try {
            const report = await this.reportRepository
                .createQueryBuilder('report')
                .where('report.id = :reportId', { reportId })
                .getOne()
            if (!report) return null

            await report.remove()
            return report
        } catch (error) {
            throw new Error(error as string)
        }
    }

    // delete many
    async deleteMany(reportIds: number[]) {
        try {
            const reportsDelete = await this.reportRepository
                .createQueryBuilder('report')
                .where('report.id IN (:...ids)', { ids: reportIds })
                .getMany()

            if (reportsDelete.length !== reportIds.length)
                throw new Error("Can't delete many report")
            await this.reportRepository.delete(reportIds)
            return true
        } catch (error) {
            throw new Error(error as string)
        }
    }
}

export const reportService = new ReportService()
