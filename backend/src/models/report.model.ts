import { StatusReport } from '@/enums'

export type IReportStatus =
    | StatusReport.HARASSMENT_OR_HATE_SPEECH
    | StatusReport.RUDE_VULGAR
    | StatusReport.SPAM_OR_COPYRIGHT_ISSUE
    | StatusReport.OTHER
