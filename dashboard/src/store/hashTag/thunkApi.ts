import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { IHashTagStore } from '.'
import { hashTagsApi } from '../../api'
import { IFilters, IHashTag, IHashTagRes, IOptionItem } from '../../models'

export const getHashTags = createAsyncThunk(
    'hashTag/getHashTags',
    async (params: IFilters) => {
        const result = await hashTagsApi.getHashTags(params)
        return result.data
    }
)

export const getAllHashTags = createAsyncThunk('hashTag/getAllHashTags', async () => {
    const result = await hashTagsApi.getAll()
    return result.data.hashTags
})

export const extraReducers = (builders: ActionReducerMapBuilder<IHashTagStore>) => {
    builders.addCase(
        getHashTags.fulfilled,
        (state: IHashTagStore, action: PayloadAction<IHashTagRes>) => {
            state.hashTags = action.payload.hashTags
            state.total = action.payload.total
        }
    )
    builders.addCase(
        getAllHashTags.fulfilled,
        (state: IHashTagStore, action: PayloadAction<IHashTag[]>) => {
            const newHashTagSelects: IOptionItem[] = action.payload.map(
                (hashTag) =>
                    ({
                        id: hashTag.id,
                        value: hashTag.id,
                        name: hashTag.name,
                    } as IOptionItem)
            )

            state.hashTagSelects = newHashTagSelects
        }
    )
}
