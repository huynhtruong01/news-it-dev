import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { authApi } from '@/api'
import { useTranslation } from 'react-i18next'

export function ActiveAccount() {
    const { t } = useTranslation()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.activeToken) return
        ;(async () => {
            try {
                if (params.activeToken) {
                    const activeToken = decodeURIComponent(params.activeToken).replaceAll(
                        '_',
                        '.'
                    )
                    await authApi.activeUser(activeToken)

                    enqueueSnackbar(t('message.create_account_success'), {
                        variant: 'success',
                    })
                    navigate('/login')
                }
            } catch (error) {
                enqueueSnackbar((error as Error).message, {
                    variant: 'error',
                })
            }
        })()
    }, [params.activeToken])

    return <Box></Box>
}
