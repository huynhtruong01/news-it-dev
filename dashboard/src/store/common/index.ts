import { createSlice } from '@reduxjs/toolkit'
import { IStatisticalNums } from './../../models'
import { extraReducers } from './thunkApi'
import { reducers } from './reducer'

export interface ICommonStore {
    statisticalNums: IStatisticalNums
    isShowModalLogout: boolean
}

const initialState: ICommonStore = {
    statisticalNums: {
        numNews: 0,
        numUser: 0,
        numHashTag: 0,
        numRole: 0,
        numLikes: 0,
    },
    isShowModalLogout: false,
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers,
    extraReducers,
})

export const { showModalLogout } = commonSlice.actions
export default commonSlice.reducer
