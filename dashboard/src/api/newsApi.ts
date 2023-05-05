import AxiosClient from '.'
import { IFilters, INews } from '../models'

const BASE_URL = '/news'

export const getNews = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, { params }).then((res) => res.data)
}

export const addNews = (data: INews) => {
    return AxiosClient.post(`${BASE_URL}`, data)
}

export const updateNews = (data: INews) => {
    return AxiosClient.put(`${BASE_URL}/${data.id}`, data)
}

export const deleteNews = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}
