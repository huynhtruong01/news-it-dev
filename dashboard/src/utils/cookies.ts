import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const getCookie = (key: string) => {
    return cookies.get(key)
}

export const setCookie = (key: string, value: string) => {
    cookies.set(key, value)
}

export const removeCookie = (key: string) => {
    cookies.remove(key)
}

export const removeFullToken = () => {
    getCookie(import.meta.env.VITE_ACCESS_TOKEN_KEY)
    getCookie(import.meta.env.VITE_REFRESH_TOKEN_KEY)
}
