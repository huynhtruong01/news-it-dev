import AxiosClient from '.'
import { ILoginValues, IResetPassword, ISignupValues, IForgotPassword } from '@/models'

const BASE_URL = '/auth'

export const login = (data: ILoginValues) => {
    return AxiosClient.post(`${BASE_URL}/login`, data).then((res) => res.data)
}

export const signup = (data: ISignupValues) => {
    return AxiosClient.post(`${BASE_URL}/signup`, data).then((res) => res.data)
}

export const googleLogin = (token: string) => {
    return AxiosClient.post(`${BASE_URL}/google-login`, {
        tokenId: token,
    }).then((res) => res.data)
}

export const facebookLogin = (accessToken: string, userId: string) => {
    return AxiosClient.post(`${BASE_URL}/facebook-login`, {
        accessToken,
        userId,
    }).then((res) => res.data)
}

export const refreshToken = (token: string) => {
    return AxiosClient.post(`${BASE_URL}/refresh-token`, {
        token,
    }).then((res) => res.data)
}

export const verifyUser = () => {
    return AxiosClient.get(`${BASE_URL}/verify`).then((res) => res.data)
}

export const activeUser = (token: string) => {
    return AxiosClient.post(
        `${BASE_URL}/active-user`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export const logout = () => {
    return AxiosClient.get(`${BASE_URL}/logout`)
}

export const resetPassword = (data: IResetPassword) => {
    return AxiosClient.post(`${BASE_URL}/reset-password`, data).then((res) => res.data)
}

export const deleteMe = () => {
    return AxiosClient.delete(`${BASE_URL}/delete-me`)
}

export const forgotPassword = (data: IForgotPassword, token: string) => {
    return AxiosClient.post(`${BASE_URL}/forgot-password`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const confirmEmail = (data: string) => {
    return AxiosClient.post(`${BASE_URL}/confirm-email`, {
        emailAddress: data,
    }).then((res) => res.data)
}
