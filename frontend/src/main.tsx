import App from '@/App'
import '@/index.css'
import { store } from '@/store'
import { theme } from '@/utils'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
                    </SnackbarProvider>
                </ThemeProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
    // </React.StrictMode>
)
