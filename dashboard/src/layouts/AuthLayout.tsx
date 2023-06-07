import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppState } from '../store'
import { IUser } from '../models'

export interface IAuthLayoutProps {
    pUser: IUser | null
}

export function AuthLayout({ pUser }: IAuthLayoutProps) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!pUser?.id) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [navigate])

    return (
        <Box>
            <Outlet />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.userLogin,
    }
}

export default connect(mapStateToProps, null)(AuthLayout)
