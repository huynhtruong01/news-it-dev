import { createSlice } from '@reduxjs/toolkit'
import { reducers } from '@/store/common/reducers'

export interface ICommonStore {
    isShowModalAuth: boolean
    isShowModalDelete: boolean
    isShowModalDeleteComment: boolean
    isShowModalDeleteAccount: boolean
}

const initialState: ICommonStore = {
    isShowModalAuth: false,
    isShowModalDelete: false,
    isShowModalDeleteComment: false,
    isShowModalDeleteAccount: false,
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
} = commonSlice.actions
export default commonSlice.reducer
