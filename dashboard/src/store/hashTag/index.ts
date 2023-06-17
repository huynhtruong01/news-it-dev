import { createSlice } from '@reduxjs/toolkit'
import { IHashTag, IOptionItem } from './../../models'
import { extraReducers } from './thunkApi'
import { reducers } from './reducers'

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
    reducers,
    extraReducers,
})

export const { addHashTag, updateHashTag, deleteHashTag } = hashTagSlice.actions
export default hashTagSlice.reducer
