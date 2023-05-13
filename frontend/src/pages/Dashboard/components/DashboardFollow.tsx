import { IUser } from '@/models'
import { Box, BoxProps } from '@mui/material'
import { DashboardFollowItem } from '.'
import { useMemo } from 'react'

export interface IDashboardFollowProps extends BoxProps {
    follows?: IUser[]
}

export function DashboardFollow({ follows, ...rest }: IDashboardFollowProps) {
    const newFollows = useMemo(() => {
        return follows?.length ? follows : []
    }, [follows])

    return (
        <Box {...rest}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: 2,
                }}
            >
                {newFollows.map((follow) => (
                    <DashboardFollowItem key={follow.id} follow={follow} />
                ))}
            </Box>
        </Box>
    )
}
