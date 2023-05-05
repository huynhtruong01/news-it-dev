import debounce from 'lodash.debounce'
import { IDebounceCallback } from '../models'
import { authApi } from '../api'
import { getCookie } from './cookies'

export const debounceFunc = (callback: IDebounceCallback, times: number) =>
    debounce(callback, times)

export const isAuthenticated = async () => {
    try {
        const accessToken = getCookie(import.meta.env.VITE_ACCESS_TOKEN_KEY)
        const refreshToken = getCookie(import.meta.env.VITE_REFRESH_TOKEN_KEY)

        if (!accessToken || !refreshToken) return false

        const res = await authApi.verifyUser()

        if (!res.data.user) return false

        return res.data.user
    } catch (error) {
        throw new Error(error as string)
    }
}
