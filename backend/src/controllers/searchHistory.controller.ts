import { Results, StatusCode, StatusText } from '@/enums'
import { RequestUser } from '@/models'
import { searchHistoryService } from '@/services'
import { Response } from 'express'

class SearchHistoryController {
    async createSearchHistory(req: RequestUser, res: Response) {
        try {
            const existUserSearchHistory = await searchHistoryService.getBySearchQuery(
                req.body.searchQuery,
                req.user?.id as number
            )

            // extract duplicate search query
            if (existUserSearchHistory) {
                res.status(StatusCode.DELETED).json({
                    results: Results.SUCCESS,
                    status: StatusText.SUCCESS,
                    data: null,
                })
                return
            }

            await searchHistoryService.create(req.body)

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

export const searchHistoryController = new SearchHistoryController()
