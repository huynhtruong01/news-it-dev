import { createSlice } from '@reduxjs/toolkit'
import { reducers } from '@/store/common/reducers'

export interface ICommonStore {
    isShowModalAuth: boolean
}

const initialState: ICommonStore = {
    isShowModalAuth: false,
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers,
})

export const { setShowModalAuth } = commonSlice.actions
export default commonSlice.reducer
