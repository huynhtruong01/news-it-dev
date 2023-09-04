import { DEFAULT_LANGUAGES } from '@/consts'
import {
    ForgotPassword,
    Signout,
    Tags,
    ConfirmEmail,
    ConfirmEmailMessage,
    Reports,
} from '@/pages'
import { AppDispatch, AppState } from '@/store'
import { setValuesSocket } from '@/store/socket'
import { setLanguages } from '@/store/common'
import { getLs } from '@/utils'
import {
    BackdropLoading,
    Header,
    NotFound,
    ScrollTop,
    SocketClient,
} from '@/components/Common'
import { MainContent } from '@/features'
import { EmptyLayout, MainLayout } from '@/layouts'
import { Box } from '@mui/material'
import i18next from 'i18next'
import { Suspense, lazy, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'
import { IUser } from '@/models'

const Login = lazy(() => import('@/pages/Auth/Login'))
const ActiveAccount = lazy(() => import('@/pages/ActiveAccount'))
const CreateNews = lazy(() => import('@/pages/CreateNews'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const News = lazy(() => import('@/pages/News'))
const Notifications = lazy(() => import('@/pages/Notifications'))
const Profile = lazy(() => import('@/pages/Profile'))
const ProfileUser = lazy(() => import('@/pages/ProfileUser'))
const SearchNews = lazy(() => import('@/pages/SearchNews'))
const ReadingList = lazy(() => import('@/pages/ReadingList'))
const Settings = lazy(() => import('@/pages/Settings'))
const Signup = lazy(() => import('@/pages/Auth/Signup'))

export interface IAppProps {
    pUser: IUser | null
    pSetSocket: (socket: Socket) => void
    pSetLanguages: (lang: string) => void
}

function App({ pSetSocket, pSetLanguages, pUser }: IAppProps) {
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
                        // <Suspense fallback={<BackdropLoading />}>
                        <MainLayout>
                            <MainContent />
                        </MainLayout>
                        // </Suspense>
                    }
                />
                {!pUser && (
                    <>
                        <Route
                            path={'/login'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <Login />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/signup'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <Signup />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/forgot-password/:token'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <ForgotPassword />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/confirm-email'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <ConfirmEmail />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/confirm-email-message'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <ConfirmEmailMessage />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/active/:activeToken'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <ActiveAccount />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                    </>
                )}
                <Route
                    path={'/news/:slug'}
                    element={
                        <Suspense fallback={<BackdropLoading />}>
                            <MainLayout>
                                <News />
                            </MainLayout>
                        </Suspense>
                    }
                />
                {pUser && (
                    <>
                        <Route
                            path={'/settings/*'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <Settings />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/dashboard/*'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <Dashboard />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/reading-list'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <ReadingList />
                                    </MainLayout>
                                </Suspense>
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
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <CreateNews />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/update-news'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <CreateNews />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/notifications'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <MainLayout>
                                        <Notifications />
                                    </MainLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/profile'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <EmptyLayout>
                                        <Profile />
                                    </EmptyLayout>
                                </Suspense>
                            }
                        />
                        <Route
                            path={'/report-abuse'}
                            element={
                                <Suspense fallback={<BackdropLoading />}>
                                    <EmptyLayout>
                                        <Reports />
                                    </EmptyLayout>
                                </Suspense>
                            }
                        />
                    </>
                )}
                <Route
                    path={'/tags/*'}
                    element={
                        <MainLayout>
                            <Tags />
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
                    path={'/profile/:username'}
                    element={
                        <Suspense fallback={<BackdropLoading />}>
                            <EmptyLayout>
                                <ProfileUser />
                            </EmptyLayout>
                        </Suspense>
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>

            <BackdropLoading />
            <ScrollTop />
        </Box>
    )
}

const mapMapToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetSocket: (socket: Socket) => dispatch(setValuesSocket(socket)),
        pSetLanguages: (lang: string) => dispatch(setLanguages(lang)),
    }
}

export default connect(mapMapToProps, mapDispatchToProps)(App)
