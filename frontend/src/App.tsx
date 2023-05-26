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
import { MainLayout } from '@layouts/index'
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
            <MainLayout>
                <Routes>
                    <Route path={'/'} element={<MainContent />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/signup'} element={<Signup />} />
                    <Route path={'/active/:activeToken'} element={<ActiveAccount />} />
                    <Route path={'/news/:slug'} element={<News />} />
                    <Route path={'/profile'} element={<Profile />} />
                    <Route path={'/profile/:username'} element={<ProfileUser />} />
                    <Route path={'/settings'} element={<Settings />} />
                    <Route path={'/dashboard/*'} element={<Dashboard />} />
                    <Route path={'/tags/*'} element={<Tags />} />
                    <Route path={'/reading-list'} element={<ReadingList />} />
                    <Route path={'/signout-confirm'} element={<Signout />} />
                    <Route path={'/create-news'} element={<CreateNews />} />
                    <Route path={'/update-news'} element={<CreateNews />} />
                    <Route path={'/notifications'} element={<Notifications />} />
                    <Route path={'/search'} element={<SearchNews />} />
                </Routes>
            </MainLayout>
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
