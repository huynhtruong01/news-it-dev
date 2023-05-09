import { Box, Paper, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api'
import { LoginForm } from '../../components/Auth'
import { useToast } from '../../hooks'
import { ILoginValues, IUser } from '../../models'
import { saveUserLogin } from '../../store/user'
import { setLS } from '../../utils'
import { AppDispatch } from '../../store'
import { connect } from 'react-redux'

export interface ILoginProps {
    pSaveUserLogin: (user: IUser) => void
}

export function Login({ pSaveUserLogin }: ILoginProps) {
    const navigate = useNavigate()
    const { toastSuccess } = useToast()

    useEffect(() => {
        document.title = 'Login'
    }, [])

    const handleLogin = async (values: ILoginValues) => {
        try {
            const res = await authApi.login(values)
            setLS(import.meta.env.VITE_ACCESS_TOKEN_KEY, res.data.accessToken)
            setLS(import.meta.env.VITE_REFRESH_TOKEN_KEY, res.data.refreshToken)

            // save user in redux
            pSaveUserLogin(res.data.user)

            navigate('/')
            toastSuccess('Login successfully.')
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: '#eee',
                minHeight: '100vh',
                paddingTop: 6,
            }}
        >
            <Paper
                sx={{
                    maxWidth: 400,
                    margin: 'auto',
                    padding: 2.5,
                    borderRadius: 1.5,
                }}
            >
                <Typography
                    component="h3"
                    variant="h5"
                    textAlign="center"
                    fontWeight={600}
                >
                    Login
                </Typography>

                <LoginForm onLoginSubmit={handleLogin} />
            </Paper>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSaveUserLogin: (user: IUser) => dispatch(saveUserLogin(user)),
    }
}

export default connect(null, mapDispatchToProps)(Login)
