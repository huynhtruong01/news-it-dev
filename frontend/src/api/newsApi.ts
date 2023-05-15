import { IFilters } from '@/models'
import AxiosClient from '.'

const BASE_URL = '/news'

export const getAllNews = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, { params }).then((res) => res.data)
}

export const getNewsBySlug = (slug: string) => {
    return AxiosClient.get(`${BASE_URL}/detail/${slug}`).then((res) => res.data)
}

export const likeNews = (id: number) => {
    return AxiosClient.get(`${BASE_URL}/like/${id}`)
}

export const unlikeNews = (id: number) => {
    return AxiosClient.get(`${BASE_URL}/unlike/${id}`)
}

export const saveNews = (id: number) => {
    return AxiosClient.get(`${BASE_URL}/save/${id}`)
}

export const unsaveNews = (id: number) => {
    return AxiosClient.get(`${BASE_URL}/unsave/${id}`)
}
