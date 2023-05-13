import { Box, Container } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { theme } from '@utils/index'
import { useNavigate } from 'react-router-dom'

export interface IMainLayoutProps {
    children: ReactNode
}

export function MainLayout({ children }: IMainLayoutProps) {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [navigate])

    return (
        <Box
            sx={{
                paddingTop: 8,
                backgroundColor: theme.palette.grey['A100'],
                minHeight: '100vh',
            }}
        >
            <Container
                sx={{
                    paddingTop: 2,
                    paddingBottom: 2,
                }}
            >
                {children}
            </Container>
        </Box>
    )
}
