import AxiosClient from '.'
import { IRoleData } from '../models'

const BASE_URL = '/roles'

export const getRoles = () => {
    return AxiosClient.get(`${BASE_URL}`).then((res) => res.data)
}

export const addRole = (data: IRoleData) => {
    return AxiosClient.post(`${BASE_URL}`, data)
}

export const updateRole = (data: IRoleData) => {
    return AxiosClient.put(`${BASE_URL}/${data.id}`, data)
}

export const deleteRole = (id: number) => {
    return AxiosClient.delete(`${BASE_URL}/${id}`)
}
