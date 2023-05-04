import AxiosClient from '.'
import { IHashTag } from '../models'

const BASE_URL = '/hash-tags'

export const getHashTags = () => {
    return AxiosClient.get(`${BASE_URL}`).then((res) => res.data)
}

export const addHashTag = (data: IHashTag) => {
    return AxiosClient.post(`${BASE_URL}`, data)
}

export const updateHashTag = (data: IHashTag) => {
    return AxiosClient.put(`${BASE_URL}/${data.id}`, data)
}

export const deleteHashTag = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}
