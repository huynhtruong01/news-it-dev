import AxiosClient from '.'
import { ILoginValues, ISignupValues } from '../models'

const BASE_URL = '/auth'

export const login = (data: ILoginValues) => {
    return AxiosClient.post(`${BASE_URL}/login`, data).then((res) => res.data)
}

export const signup = (data: ISignupValues) => {
    return AxiosClient.post(`${BASE_URL}/signup`, data).then((res) => res.data)
}

export const refreshToken = (data: ILoginValues) => {
    return AxiosClient.post(`${BASE_URL}/login`, data).then((res) => res.data)
}

export const verifyUser = () => {
    return AxiosClient.get(`${BASE_URL}/verify`).then((res) => res.data)
}

export const logout = () => {
    return AxiosClient.get(`${BASE_URL}/logout`)
}
