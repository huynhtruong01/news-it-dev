import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { isAuthenticated } from '../utils'

export function AuthLayout() {
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            try {
                const user = await isAuthenticated()

                if (user) {
                    navigate('/')
                }
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [navigate])

    return (
        <Box>
            <Outlet />
        </Box>
    )
}
