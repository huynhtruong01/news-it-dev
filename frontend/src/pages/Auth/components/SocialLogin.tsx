import { SIGNOUT_NAV } from '@/consts'
import { IFacebookLoginParams } from '@/models'
import { AppDispatch } from '@/store'
import { facebookLogin, googleLogin } from '@/store/user/thunkApi'
import { theme } from '@/utils'
import { Box, Button, alpha } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { gapi } from 'gapi-script'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import FacebookLogin, {
    ReactFacebookFailureResponse,
    ReactFacebookLoginInfo,
} from 'react-facebook-login'
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login'
import { FaFacebookSquare } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export interface ISocialLoginProps {
    pGoogleLogin: (token: string) => Promise<PayloadAction<unknown>>
    pFacebookLogin: (data: IFacebookLoginParams) => Promise<PayloadAction<unknown>>
}

function SocialLogin({ pGoogleLogin, pFacebookLogin }: ISocialLoginProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: import.meta.env.VITE_CLIENT_ID,
                scope: 'email',
            })
        }

        gapi.load('client:auth2', start)
    }, [])

    const handleNavigate = () => {
        const checkPath = location.state?.from
        if (!checkPath || checkPath === SIGNOUT_NAV) {
            navigate('/')
        } else {
            navigate(-1)
        }
    }

    const handleGoogleLogin = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        try {
            if ('tokenId' in response) {
                await pGoogleLogin(response.tokenId)
                enqueueSnackbar(t('message.login_success'), {
                    variant: 'success',
                })

                handleNavigate()
            }
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    const handleFacebookLogin = async (
        res: ReactFacebookLoginInfo | ReactFacebookFailureResponse
    ) => {
        try {
            if ('accessToken' in res && 'userID' in res) {
                const data = {
                    accessToken: res.accessToken,
                    userId: res.userID,
                }

                await pFacebookLogin(data)
                enqueueSnackbar('Log in successfully.', {
                    variant: 'success',
                })
                navigate(-1)
            }
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    return (
        <Box
            sx={{
                button: {
                    padding: theme.spacing(1.5),
                    borderRadius: theme.spacing(0.75),
                    marginBottom: theme.spacing(1),
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.secondary.main, 0.025),
                    },
                },
            }}
        >
            <GoogleLogin
                clientId={import.meta.env.VITE_CLIENT_ID}
                render={(renderProps) => (
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<FcGoogle />}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        sx={{
                            backgroundColor: 'transparent',
                            color: theme.palette.secondary.main,
                            border: `1px solid ${alpha(
                                theme.palette.secondary.main,
                                0.2
                            )}`,
                            '&:hover': {
                                backgroundColor: alpha(
                                    theme.palette.secondary.main,
                                    0.025
                                ),
                            },
                        }}
                    >
                        Sign in with Google
                    </Button>
                )}
                onSuccess={handleGoogleLogin}
                cookiePolicy={'single_host_origin'}
            />

            <FacebookLogin
                appId={import.meta.env.VITE_CLIENT_FACEBOOK_ID}
                autoLoad={false}
                fields="name,email,picture,first_name,last_name"
                scope="public_profile,user_friends"
                callback={handleFacebookLogin}
                cssClass="custom-facebook-login"
                textButton="Sign in with Facebook"
                icon={<FaFacebookSquare />}
            />
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGoogleLogin: (token: string) => dispatch(googleLogin(token)),
        pFacebookLogin: (data: IFacebookLoginParams) => dispatch(facebookLogin(data)),
    }
}

export default connect(null, mapDispatchToProps)(SocialLogin)
