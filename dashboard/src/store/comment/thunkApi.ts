import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { ICommentStore } from '.'
import { commentApi } from '../../api'
import { IComment, IFilters } from '../../models'

export const getCommentDashboard = createAsyncThunk(
    'comment/getCommentDashboard',
    async (filters: IFilters) => {
        const result = await commentApi.getCommentDashboard(filters)
        return result.data.comments
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<ICommentStore>) => {
    builders.addCase(
        getCommentDashboard.fulfilled,
        (state: ICommentStore, action: PayloadAction<IComment[]>) => {
            state.commentsDashboard = action.payload
        }
    )
}
