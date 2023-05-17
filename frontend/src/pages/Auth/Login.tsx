import { LoginForm } from '@components/forms/index'
import { ILoginValues, IUser } from '@/models'
import { Box, Typography } from '@mui/material'
import { theme } from '@utils/index'
import { authApi } from '@/api'
import { Link } from 'react-router-dom'
import { AuthContainer } from '@/pages/Auth/AuthContainer'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveUserLogin } from '@/store/user'
import { AppDispatch } from '@/store'
import { setLs } from '@/utils'
import { enqueueSnackbar } from 'notistack'

export interface ILoginProps {
    pSaveUserLogin: (user: IUser) => void
}

function Login({ pSaveUserLogin }: ILoginProps) {
    const navigate = useNavigate()

    const handleLoginSubmit = async (values: ILoginValues) => {
        try {
            const res = await authApi.login(values)

            // set user
            pSaveUserLogin(res.data.user)

            // set accessToken & refreshToken
            setLs(import.meta.env.VITE_ACCESS_TOKEN_KEY, res.data.accessToken)
            setLs(import.meta.env.VITE_REFRESH_TOKEN_KEY, res.data.refreshToken)

            enqueueSnackbar('Log in successfully.', {
                variant: 'success',
            })
            navigate(-1)
        } catch (error) {
            throw new Error(error.message as string)
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
                            margin: theme.spacing(2, 0, 1),
                            textAlign: 'center',

                            a: {
                                color: theme.palette.primary.main,

                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            },
                        }}
                    >
                        {/* TODO: WRITE LINK HERE */}
                        <Link to={'/forgot-password'}>Forgot password?</Link>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: theme.typography.body2,
                            color: theme.palette.secondary.main,
                            margin: theme.spacing(1, 0),
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSaveUserLogin: (user: IUser) => dispatch(saveUserLogin(user)),
    }
}

export default connect(null, mapDispatchToProps)(Login)
