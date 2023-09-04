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
    isShowModalDeleteAllNotify: boolean
    isShowModalUnSaveReading: boolean
    isShowModalPublicNews: boolean
    loadingCommon: boolean
    loadingComment: boolean
}

const initialState: ICommonStore = {
    languages: DEFAULT_LANGUAGES,
    isShowModalAuth: false,
    isShowModalDelete: false,
    isShowModalDeleteComment: false,
    isShowModalDeleteAccount: false,
    isShowModalDeleteNotify: false,
    isShowModalDeleteAllNotify: false,
    isShowModalUnSaveReading: false,
    isShowModalPublicNews: false,
    loadingCommon: false,
    loadingComment: false,
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
    setShowModalDeleteAllNotify,
    setShowModalUnSaveReading,
    setShowModalPublicNews,
    setLoadingCommon,
    setLoadingComment,
} = commonSlice.actions
export default commonSlice.reducer
