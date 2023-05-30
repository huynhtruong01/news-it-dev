import {
    Login,
    News,
    Signup,
    Profile,
    Settings,
    Dashboard,
    Tags,
    ReadingList,
    Signout,
    ProfileUser,
    CreateNews,
    ActiveAccount,
    Notifications,
    SearchNews,
} from '@/pages'
import { Header, ScrollTop, SocketClient } from '@components/common/index'
import { EmptyLayout, MainLayout } from '@layouts/index'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { MainContent } from '@features/index'
import { useEffect } from 'react'
import io, { Socket } from 'socket.io-client'
import { connect, useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { setValuesSocket } from '@/store/socket'

export interface IAppProps {
    pSetSocket: (socket: Socket) => void
}

function App({ pSetSocket }: IAppProps) {
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
                    path={'/settings'}
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
            </Routes>

            <ScrollTop />
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetSocket: (socket: Socket) => dispatch(setValuesSocket(socket)),
    }
}

export default connect(null, mapDispatchToProps)(App)
