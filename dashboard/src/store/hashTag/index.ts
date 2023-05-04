import { createSlice } from '@reduxjs/toolkit'
import { IHashTag } from './../../models'
import { extraReducers } from './thunkApi'

export interface IHashTagStore {
    hashTags: IHashTag[]
}

const initialState: IHashTagStore = {
    hashTags: [],
}

const hashTagSlice = createSlice({
    name: 'hashTag',
    initialState,
    reducers: {},
    extraReducers,
})

export default hashTagSlice.reducer
