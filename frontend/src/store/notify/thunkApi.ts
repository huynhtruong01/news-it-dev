import { notifyApi } from '@/api'
import { INotify, INotifyData } from '@/models'
import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { INotifyStore } from '.'

export const createNotify = createAsyncThunk(
    'notify/createNotify',
    async (data: INotifyData) => {
        const result = await notifyApi.createNotify(data)
        return result.data.notify
    }
)

export const getNotifies = createAsyncThunk('notify/getNotifies', async () => {
    const result = await notifyApi.getNotifies()
    return result.data.notifies
})

export const extraReducers = (builders: ActionReducerMapBuilder<INotifyStore>) => {
    builders.addCase(
        createNotify.fulfilled,
        (state: INotifyStore, action: PayloadAction<INotify>) => {
            const newNotifications = [...state.notifications]
            newNotifications.push(action.payload)
            state.notifications = newNotifications
            state.numNotifications = state.numNotifications + 1
        }
    )

    builders.addCase(
        getNotifies.fulfilled,
        (state: INotifyStore, action: PayloadAction<INotify[]>) => {
            state.notifications = action.payload
            state.numNotifications = action.payload.length
        }
    )
}
