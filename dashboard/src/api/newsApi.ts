import AxiosClient from '.'
import { IFilters, INews, INewsData } from '../models'

const BASE_URL = '/news'

export const getNews = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, { params }).then((res) => res.data)
}

export const addNews = (data: INewsData) => {
    return AxiosClient.post(`${BASE_URL}`, data)
}

export const updateNews = (data: INews) => {
    return AxiosClient.put(`${BASE_URL}/${data.id}`, data).then((res) => res.data)
}

export const deleteNews = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}
