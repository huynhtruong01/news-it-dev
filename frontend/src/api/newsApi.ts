import { IFilters, INewsForm, INewsRecommend } from '@/models'
import AxiosClient from '.'

const BASE_URL = '/news'

export const getAllNews = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, { params }).then((res) => res.data)
}

export const getAllNewsPublic = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}/get-all-public`, { params }).then(
        (res) => res.data
    )
}

export const getNewsBySlug = (slug: string) => {
    return AxiosClient.get(`${BASE_URL}/detail/${slug}`).then((res) => res.data)
}

export const recommendationNews = (data: INewsRecommend) => {
    return AxiosClient.post(`${BASE_URL}/recommend-news`, data).then((res) => res.data)
}

export const addNews = (data: INewsForm) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}

export const deleteNews = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}

export const updateNews = (data: INewsForm) => {
    return AxiosClient.put(`${BASE_URL}/${data?.id}`, data)
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
