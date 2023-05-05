import { Box } from '@mui/material'
import { Header, NavBar } from '../components/Common'
import { Outlet, useNavigate } from 'react-router-dom'
import { isAuthenticated, theme } from '../utils'
import { useEffect } from 'react'

export function MainLayout() {
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            try {
                const user = await isAuthenticated()
                console.log(user)

                if (!user) {
                    navigate('/login')
                }
            } catch (error) {
                if (error) {
                    navigate('/login')
                }
                throw new Error(error as string)
            }
        })()
    }, [navigate])

    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    width: 250,
                }}
            >
                <NavBar />
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    flex: 1,
                    minHeight: '100vh',
                }}
            >
                <Header />
                <Box
                    component="main"
                    sx={{
                        marginTop: '77px',
                        minHeight: 'calc(100vh - 77px)',
                    }}
                >
                    <Box
                        sx={{
                            padding: theme.spacing(4, 4, 2),
                            minHeight: 'calc(100vh - 77px)',
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
