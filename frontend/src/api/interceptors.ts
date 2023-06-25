import { getLs, setLs } from '@/utils'
import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import { authApi } from '.'

const onRequestConfig = (config: InternalAxiosRequestConfig) => {
    if (!config.headers['Authorization']) {
        const token = getLs(import.meta.env.VITE_ACCESS_TOKEN_KEY)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
    }

    if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json'
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
        if (!refreshToken) window.location.href = '/login'

        const token = await authApi.refreshToken(refreshToken)

        setLs(import.meta.env.VITE_ACCESS_TOKEN_KEY, token.data.accessToken)
        setLs(import.meta.env.VITE_REFRESH_TOKEN_KEY, token.data.refreshToken)

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
