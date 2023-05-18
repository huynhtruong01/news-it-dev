import { ICommentData, IFilters } from '@/models'
import AxiosClient from '.'

const BASE_URL = '/comments'

export const getAllCommentsById = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, {
        params,
    }).then((res) => res.data)
}

export const createComment = (data: ICommentData) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}

export const replyComment = (data: ICommentData) => {
    return AxiosClient.post(`${BASE_URL}/reply`, data).then((res) => res.data)
}

export const updateComment = (data: ICommentData) => {
    return AxiosClient.put(`${BASE_URL}/${data?.id}`, data).then((res) => res.data)
}

export const deleteComment = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}
