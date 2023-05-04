import AxiosClient from '.'
import { INews } from '../models'

const BASE_URL = '/news'

export const getNews = () => {
    return AxiosClient.get(`${BASE_URL}`).then((res) => res.data)
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
