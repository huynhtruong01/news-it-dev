import { ISearchHistoryData } from '@/models'
import AxiosClient from '.'

const BASE_URL = '/search-history'

export const createSearchHistory = (data: ISearchHistoryData) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}
