import { IFilters, IHashTag } from '../../models'
import { IHashTagStore } from '.'
import { hashTagsApi } from '../../api'
import {
    createAsyncThunk,
    ActionReducerMapBuilder,
    PayloadAction,
} from '@reduxjs/toolkit'

export const getHashTags = createAsyncThunk(
    'hashTag/getHashTags',
    async (params: IFilters) => {
        const result = await hashTagsApi.getHashTags(params)
        return result.data
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<IHashTagStore>) => {
    builders.addCase(
        getHashTags.fulfilled,
        (state: IHashTagStore, action: PayloadAction<IHashTag[]>) => {
            state.hashTags = action.payload.hashTags
            state.total = action.payload.total
        }
    )
}
