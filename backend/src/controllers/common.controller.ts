import { Results, StatusCode, StatusText } from '@/enums'
import { RequestUser } from '@/models'
import { commonService } from '@/services'
import { Response } from 'express'

export class CommonController {
    async statisticalNumsDashboard(req: RequestUser, res: Response) {
        try {
            const statisticalNums = await commonService.statisticalDashboard()
            res.status(StatusCode.SUCCESS).json({
                results: Results.SUCCESS,
                status: StatusText.SUCCESS,
                data: {
                    statisticalNums,
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
}

export const commonController = new CommonController()
