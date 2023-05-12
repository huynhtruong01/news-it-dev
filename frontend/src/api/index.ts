import axios from 'axios'
import { setupInterceptors } from '@/api/interceptors'
export * as authApi from '@/api/authApi'

const AxiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

setupInterceptors(AxiosClient)

export default AxiosClient
