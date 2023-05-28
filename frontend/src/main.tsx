import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/utils'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <ThemeProvider theme={theme}>
                            <SnackbarProvider
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                autoHideDuration={2000}
                            >
                                <CssBaseline>
                                    <App />
                                </CssBaseline>
                                <ReactQueryDevtools initialIsOpen={false} />
                            </SnackbarProvider>
                        </ThemeProvider>
                    </BrowserRouter>
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
