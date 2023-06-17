import AxiosClient from '.'
import { IFilters, IRoleData } from '../models'

const BASE_URL = '/roles'

export const getAllRoles = () => {
    return AxiosClient.get(`${BASE_URL}/get-all`).then((res) => res.data)
}

export const getRoles = (params: IFilters) => {
    return AxiosClient.get(`${BASE_URL}`, { params }).then((res) => res.data)
}

export const addRole = (data: IRoleData) => {
    return AxiosClient.post(`${BASE_URL}`, data).then((res) => res.data)
}

export const updateRole = (data: IRoleData) => {
    return AxiosClient.put(`${BASE_URL}/${data.id}`, data).then((res) => res.data)
}

export const deleteRole = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}
