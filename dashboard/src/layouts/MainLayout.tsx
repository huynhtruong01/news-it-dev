import { Box } from '@mui/material'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header, NavBar } from '../components/Common'
import { IUser } from '../models'
import { AppDispatch, AppState } from '../store'
import { saveUserLogin } from '../store/user'
import { theme } from '../utils'
import { HEIGHT_HEADER, WIDTH_NAV } from '../consts'
import { ModalLogout } from '../components/Modals'

export interface IMainLayoutProps {
    pUser: IUser | null
    pSaveUserLogin: (user: IUser) => void
}

export function MainLayout({ pUser }: IMainLayoutProps) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!pUser) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <Box
            sx={{
                display: 'flex',
                backgroundColor: theme.palette.grey['A100'],
            }}
        >
            <Box
                sx={{
                    width: WIDTH_NAV,
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
                        marginTop: HEIGHT_HEADER / 8,
                        minHeight: 'calc(100vh - 77px)',
                    }}
                >
                    <Box
                        sx={{
                            padding: theme.spacing(4, 4, 2),
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
                <ModalLogout />
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.userLogin,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSaveUserLogin: (user: IUser) => dispatch(saveUserLogin(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
