import { ModalAuth, ModalDelete, ModalDeleteComment } from '@/components'
import { HEADER_HEIGHT } from '@/consts'
import { Box, Container } from '@mui/material'
import { theme } from '@/utils'
import { ReactNode, useEffect } from 'react'
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
                position: 'relative',
                paddingTop: `${HEADER_HEIGHT}px`,
                backgroundColor: theme.palette.grey['A100'],
            }}
        >
            <Container
                sx={{
                    paddingTop: {
                        md: 3,
                        xs: 2,
                    },
                    paddingBottom: {
                        md: 3,
                        xs: 2,
                    },
                    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
                }}
            >
                {children}
            </Container>

            {/* MODAL */}
            <ModalAuth />
            <ModalDelete />
            <ModalDeleteComment />
        </Box>
    )
}
