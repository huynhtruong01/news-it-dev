import { createSlice } from '@reduxjs/toolkit'
import { IHashTag, IOptionItem } from '@/models'
import { extraReducers } from '@/store/hashTag/thunkApi'

export interface IHashTagStore {
    hashTags: IHashTag[]
    hashTagsPopular: IHashTag[]
    hashTagSelects: IOptionItem[]
    total: number
}

const initialState: IHashTagStore = {
    hashTags: [],
    hashTagsPopular: [],
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
