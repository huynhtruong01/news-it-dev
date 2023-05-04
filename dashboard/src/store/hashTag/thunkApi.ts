import { IHashTag } from '../../models'
import { IHashTagStore } from '.'
import { hashTagsApi } from '../../api'
import {
    createAsyncThunk,
    ActionReducerMapBuilder,
    PayloadAction,
} from '@reduxjs/toolkit'

export const getHashTags = createAsyncThunk('hashTag/getHashTags', async () => {
    const result = await hashTagsApi.getHashTags()
    return result.data.hashTags
})

export const extraReducers = (builders: ActionReducerMapBuilder<IHashTagStore>) => {
    builders.addCase(
        getHashTags.fulfilled,
        (state: IHashTagStore, action: PayloadAction<IHashTag[]>) => {
            state.hashTags = action.payload
        }
    )
}
