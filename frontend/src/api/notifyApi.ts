import { IFilters, INotifyData } from '@/models'
import AxiosClient from '.'

const BASE_URL = '/notifies'

export const createNotify = (data: INotifyData) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}

export const getNotifies = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, { params }).then((res) => res.data)
}
