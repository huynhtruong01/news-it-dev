import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import { authApi } from '.'
import { getLs, removeFullToken, setLs } from '../utils'

const onRequestConfig = (config: InternalAxiosRequestConfig) => {
    const token = getLs(import.meta.env.VITE_ACCESS_TOKEN_KEY)

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}

const onError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error.response?.data)
}

const onResponseConfig = (res: AxiosResponse): AxiosResponse => {
    return res
}

const onResponseError = async (
    err: AxiosError,
    axiosInstance: AxiosInstance
): Promise<AxiosError | undefined> => {
    const originalConfig = err.config as InternalAxiosRequestConfig

    if (err.response?.status === 401) {
        const refreshToken = getLs(import.meta.env.VITE_REFRESH_TOKEN_KEY)
        removeFullToken()

        const token = await authApi.refreshToken(refreshToken)

        setLs(import.meta.env.VITE_ACCESS_TOKEN_KEY, token.data.accessToken)
        setLs(import.meta.env.VITE_REFRESH_TOKEN_KEY, token.data.accessToken)

        originalConfig.headers.Authorization = `Bearer ${token.data.accessToken}`
        return axiosInstance(originalConfig)
    }

    return Promise.reject(err?.response?.data)
}

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(onRequestConfig, onError)
    axiosInstance.interceptors.response.use(onResponseConfig, (err: AxiosError) =>
        onResponseError(err, axiosInstance)
    )
}
