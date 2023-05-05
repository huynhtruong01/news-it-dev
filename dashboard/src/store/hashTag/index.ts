import { createSlice } from '@reduxjs/toolkit'
import { IHashTag } from './../../models'
import { extraReducers } from './thunkApi'

export interface IHashTagStore {
    hashTags: IHashTag[]
    total: number
}

const initialState: IHashTagStore = {
    hashTags: [],
    total: 0,
}

const hashTagSlice = createSlice({
    name: 'hashTag',
    initialState,
    reducers: {},
    extraReducers,
})

export default hashTagSlice.reducer
