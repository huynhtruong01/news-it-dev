import { HEADER_HEIGHT } from '@/consts'
import { Box, BoxProps } from '@mui/material'
import { ReactNode, useRef } from 'react'

export interface IInfinityScrollProps extends BoxProps {
    children: ReactNode
    onEndScroll: (() => Promise<void>) | (() => void)
}

export function InfinityScroll({ children, onEndScroll, ...rest }: IInfinityScrollProps) {
    const listRef = useRef<HTMLDivElement | null>(null)

    const handleScroll = () => {
        if (listRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listRef.current
            if (scrollTop + clientHeight + 30 >= scrollHeight) {
                onEndScroll()
            }
        }
    }

    return (
        <Box
            {...rest}
            sx={{
                width: '100%',
                overflowY: 'auto',
                minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            }}
            onScroll={handleScroll}
        >
            {children}
        </Box>
    )
}
