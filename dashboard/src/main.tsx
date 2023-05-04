import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App'
import './index.css'
import { theme } from './utils'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <App />
                    </CssBaseline>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
