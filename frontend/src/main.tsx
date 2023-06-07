import App from '@/App'
import '@/index.css'
import { store } from '@/store'
import { theme } from '@/utils'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import i18n from '@/i18n'
import { HelmetProvider } from 'react-helmet-async'

const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            autoHideDuration={2000}
                        >
                            <HelmetProvider>
                                <CssBaseline>
                                    <App />
                                </CssBaseline>
                            </HelmetProvider>
                        </SnackbarProvider>
                    </ThemeProvider>
                </BrowserRouter>
            </I18nextProvider>
        </PersistGate>
    </Provider>
)
