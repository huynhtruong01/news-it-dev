import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer, { combinedReducer } from './rootReducer'

// export const transformCircular = createTransform(
//     (inboundState, key) => stringify(inboundState),
//     (outboundState, key) => parse(outboundState)
// )

const persistConfig = {
    key: 'root',
    storage,
    // stateReconciler: autoMergeLevel2,
    // transforms: [transformCircular],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof combinedReducer>
