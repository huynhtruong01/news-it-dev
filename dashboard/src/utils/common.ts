import debounce from 'lodash.debounce'
import { authApi } from '../api'
import { Status, StatusUser } from '../enums'
import { IDebounceCallback, IOptionItem, IStatus } from '../models'
import { getLS } from './localStorage'
import { grey, green, red } from '@mui/material/colors'

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

export const generateOptions = (options: any): IOptionItem[] => {
    return options.map(
        (option: any) =>
            ({
                id: option?.id as number,
                name: option?.name as string,
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

export const statusColor = (status: IStatus) => {
    const colors = []

    switch (status) {
        case Status.DRAFT:
            colors.push(grey[50], grey[500])
            break
        case Status.PUBLIC:
            colors.push(green[50], green[500])
            break
        case Status.UNPUBLIC:
            colors.push(red[50], red[500])
            break
        case StatusUser.ACTIVE:
            colors.push(green[50], green[500])
            break
        case StatusUser.INACTIVE:
            colors.push(red[50], red[500])
            break
        default:
            colors.push('transparent', '#000000')
    }

    return colors
}
