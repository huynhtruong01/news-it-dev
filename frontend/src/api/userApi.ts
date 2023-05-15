import AxiosClient from '.'
import { IUser } from '@/models'

const BASE_URL = '/users'

export const getUserByUsername = (slug: string) => {
    return AxiosClient.get(`${BASE_URL}/slug/${slug}`).then((res) => res.data)
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
