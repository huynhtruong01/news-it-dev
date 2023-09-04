import { ALL } from '@/consts'
import { INotify, INotifyUpdateRead, ISetNotifications } from '@/models'
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
    setNotificationFilters: (
        state: INotifyStore,
        action: PayloadAction<ISetNotifications>
    ) => {
        const { filters, userId } = action.payload
        const notificationsFilter = [...state.notifications]
        const newNotifications = notificationsFilter.filter((n) => {
            const search =
                filters.search === ''
                    ? true
                    : (filters.search as string)
                          .toLowerCase()
                          .split(' ')
                          .filter((x) => !!x)
                          .some((w) =>
                              !n.news
                                  ? false
                                  : (n.news?.title as string).toLowerCase().includes(w)
                          )

            if (typeof filters.isRead === 'number' && (filters.isRead as number) > -2) {
                let isRead
                switch (filters.isRead) {
                    case ALL:
                        isRead = true
                        break
                    case 0:
                        isRead = !n.readUsers?.includes(userId.toString() as string)
                        break
                    case 1:
                        isRead = n.readUsers?.includes(userId.toString() as string)
                        break
                }

                return search && isRead
            }

            if (filters.type) {
                return filters.type === n.type && search
            }
        })

        state.notificationsFilter = newNotifications
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
            newNotifiesFilters[indexFilters].readUsers?.push(userId.toString())
        }

        const index = newNotifies.findIndex((n) => n.id === notify.id)
        if (index > -1) {
            newNotifies[indexFilters].readUsers?.push(userId.toString())
        }

        state.numNotifications =
            state.numNotifications === 0 ? 0 : state.numNotifications - 1
        state.notifications = newNotifies
        state.notificationsFilter = newNotifiesFilters
    },
    deleteNotify: (state: INotifyStore, action: PayloadAction<INotifyUpdateRead>) => {
        const { notify, userId } = action.payload
        const notifies = [...state.notifications]
        const notifiesFilters = [...state.notificationsFilter]

        const indexNotifiesFilters = notifiesFilters.findIndex((n) => n.id === notify.id)
        const indexNotifies = notifies.findIndex((n) => n.id === notify.id)

        if (indexNotifies > -1) notifies.splice(indexNotifies, 1)
        if (indexNotifiesFilters > -1) notifiesFilters.splice(indexNotifiesFilters, 1)

        const filtersNotifyNotRead = notifies.filter(
            (n) => !n.readUsers?.includes(userId.toString())
        )

        state.numNotifications = filtersNotifyNotRead.length
        state.total = notifies.length
        state.notifications = [...notifies]
        state.notificationsFilter = [...notifiesFilters]
    },
    setNotify: (state: INotifyStore, action: PayloadAction<INotify | null>) => {
        state.notify = action.payload
    },
    resetNotifies: (state: INotifyStore) => {
        state.notifications = []
        state.notificationsFilter = []
        state.numNotifications = 0
        state.total = 0
        state.totalFilter = 0
    },
}
