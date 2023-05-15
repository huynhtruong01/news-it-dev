import { IDebounceCallback, ISynthetic } from '@/models'
import debounce from 'lodash.debounce'

export const generateLinkImg = (file: File) => {
    return URL.createObjectURL(file)
}

export const debounceFunc = (callback: IDebounceCallback, times: number) =>
    debounce(callback, times)

export const removeDuplicated = <T extends ISynthetic>(arr: T[]) => {
    const uniqueIds = new Set<number>()
    arr.forEach((item) => {
        uniqueIds.add(item.id as number)
    })

    return arr.filter((item) => uniqueIds.has(item.id as number))
}
