import { ModalAuth, ModalDelete, ModalDeleteComment } from '@/components'
import { HEADER_HEIGHT } from '@/consts'
import { Box, Container } from '@mui/material'
import { theme } from '@utils/index'
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
                paddingTop: 8,
                backgroundColor: theme.palette.grey['A100'],
            }}
        >
            {/* <ProgressBar marginTop={`${HEADER_HEIGHT + 4}px`} /> */}
            <Container
                sx={{
                    paddingTop: {
                        md: 2,
                        xs: 1,
                    },
                    paddingBottom: 2,
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
