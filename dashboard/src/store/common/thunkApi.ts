import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { ICommonStore } from '.'
import { statisticalApi } from '../../api'
import { IStatisticalNums } from '../../models'

export const getStatisticalNums = createAsyncThunk(
    'common/getStatisticalNums',
    async () => {
        const result = await statisticalApi.statisticalNumsApi()
        return result.data.statisticalNums
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<ICommonStore>) => {
    builders.addCase(
        getStatisticalNums.fulfilled,
        (state: ICommonStore, action: PayloadAction<IStatisticalNums>) => {
            state.statisticalNums = action.payload
        }
    )
}
