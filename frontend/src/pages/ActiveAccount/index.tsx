import { authApi } from '@/api'
import { IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import { Box, Paper, Typography, alpha } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

export interface IActiveAccount {
    pUser: IUser | null
}

export function ActiveAccount({ pUser }: IActiveAccount) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const params = useParams()

    useEffect(() => {
        if (pUser) {
            navigate(-1)
            return
        }
        if (!params.activeToken) return
        ;(async () => {
            try {
                if (params.activeToken) {
                    setLoading(true)
                    const activeToken = (decodeURIComponent(params.activeToken) as string)
                        .split('_')
                        .join('.')
                    await authApi.activeUser(activeToken)

                    enqueueSnackbar(t('message.create_account_success'), {
                        variant: 'success',
                    })
                }
            } catch (error) {
                enqueueSnackbar((error as Error).message, {
                    variant: 'error',
                })
            }

            setLoading(false)
        })()
    }, [params.activeToken])

    return (
        <Box component={Paper} elevation={1} padding={3}>
            <Typography
                sx={{
                    fontWeight: 600,
                    textAlign: 'center',
                    fontSize: '17px',
                    color: alpha(theme.palette.secondary.dark, 0.9),
                    a: {
                        color: theme.palette.primary.light,
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },
                }}
            >
                {loading
                    ? `${t('message.loading_sign_up')}`
                    : `${t('message.active_account')}🎉🎉`}
                . <Link to={'/login'}>{t('auth.login')}</Link>
            </Typography>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(ActiveAccount)
