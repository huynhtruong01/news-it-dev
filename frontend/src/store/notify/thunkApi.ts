import { notifyApi } from '@/api'
import { IFilters, INotify, INotifyData, INotifyRes } from '@/models'
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

export const getNotifies = createAsyncThunk(
    'notify/getNotifies',
    async (filters: IFilters) => {
        const result = await notifyApi.getNotifies(filters)
        return result.data
    }
)

export const getNotifiesFilters = createAsyncThunk(
    'notify/getNotifiesFilters',
    async (filters: IFilters) => {
        const result = await notifyApi.getNotifies(filters)
        return result.data
    }
)

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
        (state: INotifyStore, action: PayloadAction<INotifyRes>) => {
            state.notifications = action.payload.notifies
            state.numNotifications = action.payload.notifies.length
            state.total = action.payload.total
        }
    )

    builders.addCase(
        getNotifiesFilters.fulfilled,
        (state: INotifyStore, action: PayloadAction<INotifyRes>) => {
            state.notificationsFilter = action.payload.notifies
            state.totalFilter = action.payload.total
        }
    )
}
