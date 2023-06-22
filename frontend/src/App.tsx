import { DEFAULT_LANGUAGES } from '@/consts'
import {
    ActiveAccount,
    CreateNews,
    Dashboard,
    ForgotPassword,
    Login,
    News,
    Notifications,
    Profile,
    ProfileUser,
    ReadingList,
    SearchNews,
    Settings,
    Signout,
    Signup,
    Tags,
    ConfirmEmail,
    ConfirmEmailMessage,
    Reports,
} from '@/pages'
import { AppDispatch } from '@/store'
import { setValuesSocket } from '@/store/socket'
import { setLanguages } from '@/store/common'
import { getLs } from '@/utils'
import { Header, ScrollTop, SocketClient } from '@/components/Common'
import { MainContent } from '@/features'
import { EmptyLayout, MainLayout } from '@/layouts'
import { Box } from '@mui/material'
import i18next from 'i18next'
import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'

export interface IAppProps {
    pSetSocket: (socket: Socket) => void
    pSetLanguages: (lang: string) => void
}

function App({ pSetSocket, pSetLanguages }: IAppProps) {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_HOST_BACKEND, {
            withCredentials: true,
        })
        pSetSocket(socket)

        return () => {
            socket.close()
        }
    }, [dispatch])

    useEffect(() => {
        const language = getLs('i18nextLng')
        if (!language) {
            pSetLanguages(DEFAULT_LANGUAGES)
            i18next.changeLanguage(DEFAULT_LANGUAGES)
            return
        }

        pSetLanguages(language as string)
        i18next.changeLanguage(language as string)
    }, [])

    return (
        <Box>
            <SocketClient />

            <Header />
            <Routes>
                {/* MAIN LAYOUT */}
                <Route
                    path={'/'}
                    element={
                        <MainLayout>
                            <MainContent />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/login'}
                    element={
                        <MainLayout>
                            <Login />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/signup'}
                    element={
                        <MainLayout>
                            <Signup />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/forgot-password/:token'}
                    element={
                        <MainLayout>
                            <ForgotPassword />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/confirm-email'}
                    element={
                        <MainLayout>
                            <ConfirmEmail />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/confirm-email-message'}
                    element={
                        <MainLayout>
                            <ConfirmEmailMessage />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/active/:activeToken'}
                    element={
                        <MainLayout>
                            <ActiveAccount />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/news/:slug'}
                    element={
                        <MainLayout>
                            <News />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/settings/*'}
                    element={
                        <MainLayout>
                            <Settings />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/dashboard/*'}
                    element={
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/tags/*'}
                    element={
                        <MainLayout>
                            <Tags />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/reading-list'}
                    element={
                        <MainLayout>
                            <ReadingList />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/signout-confirm'}
                    element={
                        <MainLayout>
                            <Signout />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/create-news'}
                    element={
                        <MainLayout>
                            <CreateNews />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/update-news'}
                    element={
                        <MainLayout>
                            <CreateNews />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/notifications'}
                    element={
                        <MainLayout>
                            <Notifications />
                        </MainLayout>
                    }
                />
                <Route
                    path={'/search'}
                    element={
                        <MainLayout>
                            <SearchNews />
                        </MainLayout>
                    }
                />

                {/* EMPTY LAYOUT */}
                <Route
                    path={'/profile'}
                    element={
                        <EmptyLayout>
                            <Profile />
                        </EmptyLayout>
                    }
                />
                <Route
                    path={'/profile/:username'}
                    element={
                        <EmptyLayout>
                            <ProfileUser />
                        </EmptyLayout>
                    }
                />

                <Route
                    path={'/report-abuse'}
                    element={
                        <EmptyLayout>
                            <Reports />
                        </EmptyLayout>
                    }
                />
            </Routes>

            <ScrollTop />
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetSocket: (socket: Socket) => dispatch(setValuesSocket(socket)),
        pSetLanguages: (lang: string) => dispatch(setLanguages(lang)),
    }
}

export default connect(null, mapDispatchToProps)(App)
