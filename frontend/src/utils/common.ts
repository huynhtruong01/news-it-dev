import { IDebounceCallback, ISynthetic, IOptionItem } from '@/models'
import debounce from 'lodash.debounce'

export const generateLinkImg = (file: File) => {
    return URL.createObjectURL(file)
}

export const debounceFunc = (callback: IDebounceCallback, times: number) =>
    debounce(callback, times)

export const removeDuplicated = <T extends ISynthetic>(arr: T[]) => {
    const newArr: T[] = []
    arr.forEach((item) => {
        const idsNewArr = newArr.map((i) => i.id)
        const checkExist = idsNewArr.includes(item.id)
        if (!checkExist) newArr.push(item)
    })

    return newArr
}

export const generateIds = (options: IOptionItem[]): number[] => {
    return options.map((item) => item.id)
}
