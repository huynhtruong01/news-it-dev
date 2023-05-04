import AxiosClient from '.'
import { IUserData } from '../models'

const BASE_URL = '/users'

export const getUsers = () => {
    return AxiosClient.get(`${BASE_URL}`).then((res) => res.data)
}

export const addUser = (data: IUserData) => {
    return AxiosClient.post(`${BASE_URL}`, data)
}

export const updateUser = (data: IUserData) => {
    return AxiosClient.post(`${BASE_URL}/${data.id}`, data)
}

export const deleteUser = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}
