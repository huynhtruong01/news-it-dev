import AxiosClient from '.'
import { IFilters, IHashTag } from '../models'

const BASE_URL = '/hash-tags'

export const getAll = () => {
    return AxiosClient.get(`${BASE_URL}/get-all`).then((res) => res.data)
}

export const getHashTags = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, {
        params,
    }).then((res) => res.data)
}

export const addHashTag = (data: IHashTag) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}

export const updateHashTag = (data: IHashTag) => {
    return AxiosClient.put(`${BASE_URL}/${data.id}`, data)
}

export const deleteHashTag = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}
