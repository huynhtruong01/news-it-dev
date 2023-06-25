import { authApi } from '@/api'
import { AuthContainer } from '@/pages/Auth/AuthContainer'
import { SignupForm } from '@/components/Forms'
import { ISignupValues } from '@/models'
import { Box, Typography } from '@mui/material'
import { theme } from '@/utils'
import { enqueueSnackbar } from 'notistack'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { IUser } from '@/models'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/Common'

export interface ISignupProps {
    pUser: IUser | null
}

export function Signup({ pUser }: ISignupProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pUser) navigate(-1)
    }, [navigate])

    const handleSignupSubmit = async (values: ISignupValues) => {
        try {
            await authApi.signup(values)

            enqueueSnackbar(t('message.signup_success'), {
                variant: 'success',
            })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    return (
        <AuthContainer>
            <Seo title={`${t('auth.sign_up')} - ${t('title_document.news_community')}`} />
            <Box>
                <SignupForm onSignupSubmit={handleSignupSubmit} />
                <Typography
                    sx={{
                        fontSize: '14px',
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
                    {t('auth.already_account')}{' '}
                    <Link to={'/login'}>{t('auth.login')}</Link>
                </Typography>
            </Box>
        </AuthContainer>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(Signup)
