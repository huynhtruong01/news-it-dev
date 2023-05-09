import debounce from 'lodash.debounce'
import { IDebounceCallback, IRole, IOptionItem } from '../models'
import { authApi } from '../api'
import { getLS } from './localStorage'

export const debounceFunc = (callback: IDebounceCallback, times: number) =>
    debounce(callback, times)

export const isAuthenticated = async () => {
    try {
        const accessToken = getLS(import.meta.env.VITE_ACCESS_TOKEN_KEY)
        const refreshToken = getLS(import.meta.env.VITE_REFRESH_TOKEN_KEY)

        if (!accessToken || !refreshToken) return false

        const res = await authApi.verifyUser()

        if (!res.data.user) return false

        return res.data.user
    } catch (error) {
        throw new Error(error as string)
    }
}

export const generateOptions = <IData>(options: IData[]): IOptionItem[] => {
    return options.map(
        (option) =>
            ({
                id: option.id,
                name: option.name,
            } as IOptionItem)
    )
}

export const generateIds = (options: IOptionItem[]) => {
    return options.map((item) => item.id)
}

export const setNewValues = <IData>(values: IData, keyList: string[]) => {
    return keyList.reduce((obj, key) => {
        obj[key] = values[key as keyof IData]
        return obj
    }, {} as { [key: string]: any }) as IData
}

export const generateLinkImg = (file: File) => {
    return URL.createObjectURL(file)
}
