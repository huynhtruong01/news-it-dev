import { PayloadAction } from '@reduxjs/toolkit'
import { INotifyStore } from '.'
import { INotify } from '@/models'

export const reducers = {
    addNotify: (state: INotifyStore, action: PayloadAction<INotify>) => {
        const newNotifies = [...state.notifications]
        const newFiltersNotifies = [...state.notificationsFilter]
        newNotifies.unshift(action.payload)
        newFiltersNotifies.unshift(action.payload)

        state.notifications = newNotifies
        state.notificationsFilter = newFiltersNotifies

        state.numNotifications = state.numNotifications + 1
        state.total = newNotifies.length
    },
    resetNotify: (state: INotifyStore) => {
        state.notifications = []
        state.notificationsFilter = []
        state.numNotifications = 0
        state.total = 0
        state.totalFilter = 0
    },
}
