import { IFilters, INotifyData, INotifyDataComment, INotifyNewNews } from '@/models'
import AxiosClient from '.'

const BASE_URL = '/notifies'

export const createNotify = (data: INotifyData) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}

export const createNotifiesForComment = (data: INotifyDataComment) => {
    return AxiosClient.post(`${BASE_URL}/multiple`, data).then((res) => res.data)
}

export const newNewsNotify = (data: INotifyNewNews) => {
    return AxiosClient.post(`${BASE_URL}/new-news`, data).then((res) => res.data)
}

export const createCommentNotify = (data: INotifyData) => {
    return AxiosClient.post(`${BASE_URL}/create-comment`, data).then((res) => res.data)
}

export const likeNotify = (data: INotifyData) => {
    return AxiosClient.post(`${BASE_URL}/like`, data).then((res) => res.data)
}

export const followNotify = (data: INotifyData) => {
    return AxiosClient.post(`${BASE_URL}/follow`, data).then((res) => res.data)
}

export const replyCommentNotify = (data: INotifyData) => {
    return AxiosClient.post(`${BASE_URL}/reply`, data).then((res) => res.data)
}

export const getNotifies = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, { params }).then((res) => res.data)
}

export const readUsersNotify = (notifyId: number) => {
    return AxiosClient.get(`${BASE_URL}/read-users/${notifyId}`).then((res) => res.data)
}

export const deleteNotify = (notifyId: number) => {
    return AxiosClient.delete(`${BASE_URL}/${notifyId}`)
}

export const deleteAllNotify = () => {
    return AxiosClient.delete(`${BASE_URL}`)
}
