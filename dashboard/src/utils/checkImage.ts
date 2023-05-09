import { IMAGE_MINE_TYPE } from '../consts'

export const checkSizeImg = (file: File | null, size: number) => {
    if (!file) return true
    return file.size <= size
}

export const checkTypeImg = (file: File | null) => {
    if (!file) return true
    return IMAGE_MINE_TYPE.includes(file.type)
}
