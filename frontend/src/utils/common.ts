import { IDebounceCallback, ISynthetic, IOptionItem } from '@/models'
import debounce from 'lodash.debounce'

export const generateLinkImg = (file: File) => {
    return URL.createObjectURL(file)
}

export const debounceFunc = (callback: IDebounceCallback, times: number) =>
    debounce(callback, times)

export const removeDuplicated = <T extends ISynthetic>(arr: T[]) => {
    // const uniqueIds = new Set<number>()
    // arr.forEach((item) => {
    //     uniqueIds.add(item.id as number)
    // })

    // return arr.filter((item) => {
    //     console.log(item.id, uniqueIds.has(item.id as number))
    //     return uniqueIds.has(item.id as number)
    // })

    const newArr: T[] = []
    arr.forEach((item) => {
        const idsNewArr = newArr.map((i) => i.id)
        const checkExist = idsNewArr.includes(item.id)
        if (!checkExist) newArr.push(item)
    })

    return newArr
}

export const generateIds = (options: IOptionItem[]) => {
    return options.map((item) => item.id)
}
