import AxiosClient from '.'
import { IFilters, IUserData } from '../models'

const BASE_URL = '/users'

export const getUsers = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, { params }).then((res) => res.data)
}

export const addUser = (data: IUserData) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}

export const updateUser = (data: IUserData) => {
    return AxiosClient.put(`${BASE_URL}/${data.id}`, data).then((res) => res.data)
}

export const deleteUser = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}
