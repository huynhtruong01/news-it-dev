import { Box, Container } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { theme } from '@utils/index'
import { useNavigate } from 'react-router-dom'
import { ModalAuth } from '@/components'

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
            }}
        >
            <Container
                sx={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                {children}
            </Container>
            <ModalAuth />
        </Box>
    )
}
