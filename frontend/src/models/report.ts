import { StatusReport } from '@/enums'
import { INews, IObjectCommon, IUser } from '.'

export type IReportStatus =
    | StatusReport.HARASSMENT_OR_HATE_SPEECH
    | StatusReport.RUDE_VULGAR
    | StatusReport.SPAM_OR_COPYRIGHT_ISSUE
    | StatusReport.OTHER

export interface IReportData {
    id?: number
    userId: number
    newsId: number
    reporter?: IUser
    reportNews?: INews
    reason: string
    status: IReportStatus
}

export interface IReportForm {
    report: IObjectCommon | null
    message?: string
}
