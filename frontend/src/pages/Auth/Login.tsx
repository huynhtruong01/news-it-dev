import { LoginForm } from '@components/forms/index'
import { ILoginValues } from '@models/index'
import { Box, Typography } from '@mui/material'
import { theme } from '@utils/index'
import { authApi } from '@/api'
import { useToast } from '@hooks/index'
import { Link } from 'react-router-dom'
import { AuthContainer } from '@/pages/Auth/AuthContainer'
import { useNavigate } from 'react-router-dom'

export function Login() {
    const { toastSuccess } = useToast()
    const navigate = useNavigate()

    const handleLoginSubmit = async (values: ILoginValues) => {
        try {
            await authApi.login(values)

            toastSuccess('Login successfully.')
            navigate(-1)
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <AuthContainer>
            <>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        margin: theme.spacing(4, 0),
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            width: '100%',
                            height: '1px',
                            transform: 'translate(0, -50%)',
                            backgroundColor: theme.palette.secondary.light,
                        }}
                    ></Box>
                    <Typography
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            textAlign: 'center',
                            margin: 'auto',
                            width: '100%',
                            transform: 'translate(0, -50%)',
                            fontSize: theme.typography.body2,
                            color: theme.palette.secondary.main,
                            span: {
                                padding: theme.spacing(0, 1),
                                backgroundColor: theme.palette.primary.contrastText,
                            },
                        }}
                    >
                        <span>Have a password? Continue with your email address</span>
                    </Typography>
                </Box>
                <Box marginTop={8}>
                    <LoginForm onLoginSubmit={handleLoginSubmit} />
                    <Typography
                        sx={{
                            fontSize: theme.typography.body2,
                            color: theme.palette.secondary.main,
                            margin: theme.spacing(2, 0),
                            textAlign: 'center',

                            a: {
                                color: theme.palette.primary.main,

                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            },
                        }}
                    >
                        Don't have account by email? <Link to={'/signup'}>Sign up</Link>
                    </Typography>
                </Box>
            </>
        </AuthContainer>
    )
}
