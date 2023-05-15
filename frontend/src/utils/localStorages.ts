export const getLs = (key: string) => {
    return localStorage.getItem(key) || ''
}

export const setLs = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

export const removeLs = (key: string) => {
    localStorage.removeItem(key)
}

export const removeFullToken = () => {
    removeLs(import.meta.env.VITE_ACCESS_TOKEN_KEY)
    removeLs(import.meta.env.VITE_REFRESH_TOKEN_KEY)
}
