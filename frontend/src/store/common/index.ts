import { createSlice } from '@reduxjs/toolkit'
import { reducers } from '@/store/common/reducers'

export interface ICommonStore {
    isShowModalAuth: boolean
    isShowModalDelete: boolean
}

const initialState: ICommonStore = {
    isShowModalAuth: false,
    isShowModalDelete: false,
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers,
})

export const { setShowModalAuth, setShowModalDelete } = commonSlice.actions
export default commonSlice.reducer
