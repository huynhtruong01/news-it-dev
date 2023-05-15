import { IFilters } from '@/models'
import AxiosClient from '.'

const BASE_URL = '/news'

export const getAllNews = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, { params }).then((res) => res.data)
}

export const getNewsBySlug = (slug: string) => {
    return AxiosClient.get(`${BASE_URL}/detail/${slug}`).then((res) => res.data)
}
