import { notifyApi } from '@/api'
import {
    INotifiesFilter,
    INotify,
    INotifyData,
    INotifyRes,
    INotifyUpdateRead,
    INotifyUpdateReadParams,
} from '@/models'
import {
    ActionReducerMapBuilder,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { INotifyStore } from '.'

export const createNotify = createAsyncThunk(
    'notify/createNotify',
    async (data: INotifyData, { rejectWithValue }) => {
        try {
            const result = await notifyApi.createNotify(data)
            return result.data.notify
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getNotifies = createAsyncThunk(
    'notify/getNotifies',
    async ({ filters, userId }: INotifiesFilter) => {
        const result = await notifyApi.getNotifies(filters)
        return { ...result.data, userId }
    }
)

export const getNotifiesFilters = createAsyncThunk(
    'notify/getNotifiesFilters',
    async ({ filters, userId }: INotifiesFilter) => {
        const result = await notifyApi.getNotifies(filters)
        return { ...result.data, userId }
    }
)

export const readUsersNotify = createAsyncThunk(
    'notify/readUsersNotify',
    async ({ notifyId, userId }: INotifyUpdateReadParams) => {
        const result = await notifyApi.readUsersNotify(notifyId)

        return {
            notify: result.data.notify,
            userId,
        }
    }
)

export const extraReducers = (builders: ActionReducerMapBuilder<INotifyStore>) => {
    builders
        .addCase(
            createNotify.fulfilled,
            (state: INotifyStore, action: PayloadAction<INotify>) => {
                const newNotifications = [...state.notifications]
                const newNotificationsFilters = [...state.notificationsFilter]
                newNotifications.unshift(action.payload)
                newNotificationsFilters.unshift(action.payload)

                state.notifications = newNotifications
                state.notificationsFilter = newNotificationsFilters
                state.numNotifications = state.numNotifications + 1
                state.total = newNotificationsFilters.length
            }
        )
        .addCase(createNotify.rejected, (state, action: PayloadAction<any>) => {
            throw new Error(action.payload.message as string)
        })

    builders.addCase(
        getNotifies.fulfilled,
        (state: INotifyStore, action: PayloadAction<INotifyRes>) => {
            state.notifications = action.payload.notifies
            const notifiesNotRead = action.payload.notifies.filter(
                (n) => !n.readUsers?.includes(action.payload.userId?.toString() as string)
            )
            state.notificationsFilter = action.payload.notifies
            state.numNotifications = notifiesNotRead.length
            state.total = action.payload.total
        }
    )

    builders
        .addCase(
            getNotifiesFilters.fulfilled,
            (state: INotifyStore, action: PayloadAction<INotifyRes>) => {
                state.notificationsFilter = action.payload.notifies
                state.totalFilter = action.payload.total
            }
        )
        .addCase(getNotifiesFilters.rejected, (state, action: PayloadAction<any>) => {
            throw new Error(action.payload.message as string)
        })

    builders.addCase(
        readUsersNotify.fulfilled,
        (state: INotifyStore, action: PayloadAction<INotifyUpdateRead>) => {
            const newNotifiesFilters = [...state.notificationsFilter]
            const newNotifies = [...state.notifications]

            const indexFilters = newNotifiesFilters.findIndex(
                (notify) => notify.id === action.payload.notify.id
            )
            const index = newNotifies.findIndex(
                (notify) => notify.id === action.payload.notify.id
            )

            if (indexFilters > -1) {
                newNotifiesFilters[indexFilters] = action.payload.notify
            }

            if (index > -1) {
                newNotifies[index] = action.payload.notify
            }

            state.notificationsFilter = newNotifiesFilters
            state.notifications = newNotifies
            state.numNotifications = state.numNotifications - 1
        }
    )
}
