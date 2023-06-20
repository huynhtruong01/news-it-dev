import { ModalAuth } from '@/components'
import { HEADER_HEIGHT } from '@/consts'
import { theme } from '@/utils'
import { Box, BoxProps } from '@mui/material'
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export interface IEmptyLayoutProps extends BoxProps {
    children: ReactNode
}

export function EmptyLayout({ children, ...rest }: IEmptyLayoutProps) {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [navigate])

    return (
        <Box
            sx={{
                paddingTop: `${HEADER_HEIGHT}px`,
                paddingBottom: 2,
                backgroundColor: theme.palette.grey['A100'],
                minHeight: '100vh',
            }}
            {...rest}
        >
            {children}
            <ModalAuth />
        </Box>
    )
}
