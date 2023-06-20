import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { IHashTagStore } from '.'
import { hashTagApi } from '@/api'
import { IFilters, IHashTag, IHashTagRes, IOptionItem } from '@/models'
import { Order } from '@/enums'

export const getHashTags = createAsyncThunk(
    'hashTag/getHashTags',
    async (params: IFilters) => {
        const result = await hashTagApi.getHashTags(params)
        return result.data
    }
)

export const getAllHashTags = createAsyncThunk('hashTag/getAllHashTags', async () => {
    const result = await hashTagApi.getAll()
    return result.data.hashTags
})

export const getAllHashTagsPopular = createAsyncThunk(
    'hashTag/getAllHashTagsPopular',
    async () => {
        const params: IFilters = {
            page: 1,
            limit: 20,
            numNews: Order.ASC,
        }
        const result = await hashTagApi.getHashTags(params)
        return result.data.hashTags
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<IHashTagStore>) => {
    builders.addCase(
        getHashTags.fulfilled,
        (state: IHashTagStore, action: PayloadAction<IHashTagRes>) => {
            const newHashTagSelects: IOptionItem[] = action.payload.hashTags.map(
                (hashTag) =>
                    ({
                        id: hashTag.id,
                        name: hashTag.name,
                    } as IOptionItem)
            )

            state.hashTags = action.payload.hashTags
            state.hashTagSelects = newHashTagSelects
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
                        name: hashTag.name,
                    } as IOptionItem)
            )

            state.hashTagSelects = newHashTagSelects
        }
    )
    builders.addCase(
        getAllHashTagsPopular.fulfilled,
        (state: IHashTagStore, action: PayloadAction<IHashTag[]>) => {
            state.hashTagsPopular = action.payload
        }
    )
}
