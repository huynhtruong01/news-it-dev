import { authApi } from '@/api'
import { theme } from '@/utils'
import { Box, Paper, Typography, alpha } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

export function ActiveAccount() {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)
    const params = useParams()

    useEffect(() => {
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
