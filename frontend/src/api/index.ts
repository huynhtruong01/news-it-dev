import axios from 'axios'
import { setupInterceptors } from '@/api/interceptors'
export * as authApi from '@/api/authApi'
export * as userApi from '@/api/userApi'
export * as hashTagApi from '@/api/hashTagApi'
export * as newsApi from '@/api/newsApi'
export * as commentApi from '@/api/commentApi'
export * as notifyApi from '@/api/notifyApi'
export * as searchHistoryApi from '@/api/searchHistoryApi'
export * as reportApi from '@/api/reportApi'

const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

setupInterceptors(AxiosClient)

export default AxiosClient
