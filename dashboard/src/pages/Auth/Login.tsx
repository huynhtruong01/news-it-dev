import { Box, Typography, Paper } from '@mui/material'
import { LoginForm } from '../../components/Auth'
import { ILoginValues } from '../../models'
import { authApi } from '../../api'
import { useNavigate } from 'react-router-dom'
import { setCookie } from '../../utils'
import { useEffect } from 'react'

export function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Login'
    }, [])

    const handleLogin = async (values: ILoginValues) => {
        try {
            const res = await authApi.login(values)
            setCookie(import.meta.env.VITE_ACCESS_TOKEN_KEY, res.data.accessToken)
            setCookie(import.meta.env.VITE_REFRESH_TOKEN_KEY, res.data.refreshToken)

            navigate('/')
        } catch (error) {
            console.log(error)
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
