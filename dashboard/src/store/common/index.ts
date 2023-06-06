import { createSlice } from '@reduxjs/toolkit'
import { IStatisticalNums } from './../../models'
import { extraReducers } from './thunkApi'

export interface ICommonStore {
    statisticalNums: IStatisticalNums
}

const initialState: ICommonStore = {
    statisticalNums: {
        numNews: 0,
        numUser: 0,
        numHashTag: 0,
        numRole: 0,
        numLikes: 0,
    },
}

const roleSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {},
    extraReducers,
})

export default roleSlice.reducer
