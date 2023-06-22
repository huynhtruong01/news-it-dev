import { IReportData } from '@/models'
import AxiosClient from '.'

const BASE_URL = '/reports'

export const createReport = (data: IReportData) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}
