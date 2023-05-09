import { createSlice } from '@reduxjs/toolkit'
import { IHashTag, IOptionItem } from './../../models'
import { extraReducers } from './thunkApi'

export interface IHashTagStore {
    hashTags: IHashTag[]
    hashTagSelects: IOptionItem[]
    total: number
}

const initialState: IHashTagStore = {
    hashTags: [],
    hashTagSelects: [],
    total: 0,
}

const hashTagSlice = createSlice({
    name: 'hashTag',
    initialState,
    reducers: {},
    extraReducers,
})

export default hashTagSlice.reducer
