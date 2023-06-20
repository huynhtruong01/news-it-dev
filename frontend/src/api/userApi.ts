import AxiosClient from '.'
import { IFiltersUserNews, IUser } from '@/models'

const BASE_URL = '/users'

export const getUserByUsername = (username: string) => {
    return AxiosClient.get(`${BASE_URL}/name/${username}`).then((res) => res.data)
}

export const getSaveNewsFilters = (id: number, params: IFiltersUserNews) => {
    return AxiosClient.get(`${BASE_URL}/profile/${id}`, { params }).then(
        (res) => res.data
    )
}

export const updateUser = (data: IUser) => {
    return AxiosClient.put(`${BASE_URL}/${data.id}`, data).then((res) => res.data)
}

export const followUser = (userId: number) => {
    return AxiosClient.get(`${BASE_URL}/follow/${userId}`)
}

export const unfollowUser = (userId: number) => {
    return AxiosClient.get(`${BASE_URL}/unfollow/${userId}`)
}

export const getProfile = () => {
    return AxiosClient.get(`${BASE_URL}/profile`).then((res) => res.data)
}

export const suggestionUsers = () => {
    return AxiosClient.get(`${BASE_URL}/suggestion`).then((res) => res.data)
}

export const topUsers = () => {
    return AxiosClient.get(`${BASE_URL}/top`).then((res) => res.data)
}
