export const getLS = (key: string) => {
    return localStorage.getItem(key) || ''
}

export const setLS = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

export const removeLS = (key: string) => {
    localStorage.removeItem(key)
}

export const removeFullToken = () => {
    removeLS(import.meta.env.VITE_ACCESS_TOKEN_KEY)
    removeLS(import.meta.env.VITE_REFRESH_TOKEN_KEY)
}
