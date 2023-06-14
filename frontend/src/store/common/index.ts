import { createSlice } from '@reduxjs/toolkit'
import { reducers } from '@/store/common/reducers'
import { DEFAULT_LANGUAGES } from '@/consts'

export interface ICommonStore {
    languages: string
    isShowModalAuth: boolean
    isShowModalDelete: boolean
    isShowModalDeleteComment: boolean
    isShowModalDeleteAccount: boolean
    isShowModalDeleteNotify: boolean
    isShowModalUnSaveReading: boolean
}

const initialState: ICommonStore = {
    languages: DEFAULT_LANGUAGES,
    isShowModalAuth: false,
    isShowModalDelete: false,
    isShowModalDeleteComment: false,
    isShowModalDeleteAccount: false,
    isShowModalDeleteNotify: false,
    isShowModalUnSaveReading: false,
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers,
})

export const {
    setShowModalAuth,
    setShowModalDelete,
    setShowModalDeleteComment,
    setShowModalDeleteAccount,
    setLanguages,
    setShowModalDeleteNotify,
    setShowModalUnSaveReading,
} = commonSlice.actions
export default commonSlice.reducer
