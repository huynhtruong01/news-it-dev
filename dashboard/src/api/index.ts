import axios from 'axios'
import { setupInterceptors } from './interceptors'
export * as authApi from './authApi'
export * as usersApi from './usersApi'
export * as rolesApi from './rolesApi'
export * as hashTagsApi from './hashTagsApi'
export * as newsApi from './newsApi'
export * as statisticalApi from './statisticalApi'
export * as commentApi from './commentApi'

const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

setupInterceptors(AxiosClient)

export default AxiosClient
