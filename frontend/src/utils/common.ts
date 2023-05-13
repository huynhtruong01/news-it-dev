import { IDebounceCallback } from '@/models'
import debounce from 'lodash.debounce'

export const generateLinkImg = (file: File) => {
    return URL.createObjectURL(file)
}

export const debounceFunc = (callback: IDebounceCallback, times: number) =>
    debounce(callback, times)
