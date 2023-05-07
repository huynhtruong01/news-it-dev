import { Box } from '@mui/material'
import { Header, NavBar } from '../components/Common'
import { Outlet, useNavigate } from 'react-router-dom'
import { isAuthenticated, theme } from '../utils'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppDispatch } from '../store'
import { saveUserLogin } from '../store/user'
import { IUser } from '../models'

export interface IMainLayoutProps {
    pSaveUserLogin: (user: IUser) => void
}

export function MainLayout({ pSaveUserLogin }: IMainLayoutProps) {
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            try {
                const user = await isAuthenticated()

                if (!user) {
                    navigate('/login')
                }

                pSaveUserLogin(user)
            } catch (error) {
                if (error) {
                    navigate('/login')
                }
                throw new Error(error as string)
            }
        })()
    }, [navigate])

    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    width: 250,
                }}
            >
                <NavBar />
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    flex: 1,
                    minHeight: '100vh',
                }}
            >
                <Header />
                <Box
                    component="main"
                    sx={{
                        marginTop: '77px',
                        minHeight: 'calc(100vh - 77px)',
                    }}
                >
                    <Box
                        sx={{
                            padding: theme.spacing(4, 4, 2),
                            minHeight: 'calc(100vh - 77px)',
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSaveUserLogin: (user: IUser) => dispatch(saveUserLogin(user)),
    }
}

export default connect(null, mapDispatchToProps)(MainLayout)
