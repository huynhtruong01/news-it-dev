import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import { authApi } from '@/api'

// export interface IActiveAccountProps {}

export function ActiveAccount() {
    const params = useParams()
    const navigate = useNavigate()

    console.log('token:', params.activeToken)
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

                    enqueueSnackbar('Create account success. Please login.', {
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
