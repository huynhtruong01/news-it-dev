import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/utils'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { SnackbarProvider } from 'notistack'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <CssBaseline>
                                <ToastContainer
                                    position="top-right"
                                    autoClose={2000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="colored"
                                />
                                <App />
                            </CssBaseline>
                        </SnackbarProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
