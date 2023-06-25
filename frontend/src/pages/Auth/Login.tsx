import { LoginForm } from '@/components/Forms'
import { ILoginValues, IUser } from '@/models'
import { Box, Typography } from '@mui/material'
import { theme } from '@/utils'
import { authApi } from '@/api'
import { Link } from 'react-router-dom'
import { AuthContainer } from '@/pages/Auth/AuthContainer'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveUserLogin } from '@/store/user'
import { AppDispatch, AppState } from '@/store'
import { setLs } from '@/utils'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
// import { SIGNOUT_NAV } from '@/consts'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Common'

export interface ILoginProps {
    pUser: IUser | null
    pSaveUserLogin: (user: IUser) => void
}

function Login({ pUser, pSaveUserLogin }: ILoginProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    // const location = useLocation()

    useEffect(() => {
        if (pUser) navigate(-1)
    }, [])

    const handleLoginSubmit = async (values: ILoginValues) => {
        try {
            const res = await authApi.login(values)

            // set user
            pSaveUserLogin(res.data.user)

            // set accessToken & refreshToken
            setLs(import.meta.env.VITE_ACCESS_TOKEN_KEY, res.data.accessToken)
            setLs(import.meta.env.VITE_REFRESH_TOKEN_KEY, res.data.refreshToken)

            enqueueSnackbar(t('message.login_success'), {
                variant: 'success',
            })

            navigate('/')
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    return (
        <AuthContainer>
            <>
                <Seo
                    title={`${t('auth.login')} - ${t('title_document.news_community')}`}
                />
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
                        <span>{t('auth.title_have_password')}</span>
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
                        {/* WRITE LINK HERE */}
                        <Link to={'/confirm-email'}>{t('auth.forgot_password')}?</Link>
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
                        {t('auth.dont_have_account')}{' '}
                        <Link to={'/signup'}>{t('auth.sign_up')}</Link>
                    </Typography>
                </Box>
            </>
        </AuthContainer>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSaveUserLogin: (user: IUser) => dispatch(saveUserLogin(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
