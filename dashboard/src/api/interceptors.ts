import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import { authApi } from '.'
import { getLS, setLS } from '../utils'

const onRequestConfig = (config: InternalAxiosRequestConfig) => {
    const token = getLS(import.meta.env.VITE_ACCESS_TOKEN_KEY)

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
        const refreshToken = getLS(import.meta.env.VITE_REFRESH_TOKEN_KEY)
        if (!refreshToken) window.location.href = '/login'

        const token = await authApi.refreshToken(refreshToken)

        setLS(import.meta.env.VITE_ACCESS_TOKEN_KEY, token.data.accessToken)
        setLS(import.meta.env.VITE_REFRESH_TOKEN_KEY, token.data.refreshToken)

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
