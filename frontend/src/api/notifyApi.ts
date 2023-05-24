import { INotifyData } from '@/models'
import AxiosClient from '.'

const BASE_URL = '/notifies'

export const createNotify = (data: INotifyData) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}

export const getNotifies = () => {
    return AxiosClient.get(`${BASE_URL}`).then((res) => res.data)
}
