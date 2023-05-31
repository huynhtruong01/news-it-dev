import { INotify, INotifyUpdateRead } from '@/models'
import { PayloadAction } from '@reduxjs/toolkit'
import { INotifyStore } from '.'

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
    readUserNotify: (state: INotifyStore, action: PayloadAction<INotifyUpdateRead>) => {
        const newNotifiesFilters = [...state.notificationsFilter]
        const newNotifies = [...state.notifications]
        const notify = action.payload.notify
        const userId = action.payload.userId

        const indexFilters = newNotifiesFilters.findIndex((n) => n.id === notify.id)
        if (indexFilters > -1) {
            newNotifiesFilters[indexFilters].readUsers.push(userId.toString())
        }

        const index = newNotifies.findIndex((n) => n.id === notify.id)
        if (index > -1) {
            newNotifies[indexFilters].readUsers.push(userId.toString())
        }

        state.numNotifications =
            state.numNotifications === 0 ? 0 : state.numNotifications - 1
        state.notifications = newNotifies
        state.notificationsFilter = newNotifiesFilters
    },
    deleteNotify: (state: INotifyStore, action: PayloadAction<INotify>) => {
        const notifies = [...state.notifications]
        const notifiesFilters = [...state.notificationsFilter]

        const indexNotifiesFilters = notifiesFilters.findIndex(
            (n) => n.id === action.payload.id
        )
        const indexNotifies = notifies.findIndex((n) => n.id === action.payload.id)

        if (indexNotifies > -1) notifies.splice(indexNotifies, 1)
        if (indexNotifiesFilters > -1) notifiesFilters.splice(indexNotifiesFilters, 1)

        state.notifications = [...notifies]
        state.notificationsFilter = [...notifiesFilters]
    },
}
