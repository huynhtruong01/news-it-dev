import { IUser } from '@/models'
import { Box, BoxProps, Grid } from '@mui/material'
import { DashboardFollowItem } from '@/pages/Dashboard/components/DashboardFollow/components'
import { useMemo } from 'react'
import { EmptyList } from '@/components/Common'

export interface IDashboardFollowProps extends BoxProps {
    follows?: IUser[]
}

export function DashboardFollow({ follows, ...rest }: IDashboardFollowProps) {
    const newFollows = useMemo(() => {
        return follows?.length ? follows : []
    }, [follows])

    return (
        <Box {...rest}>
            {newFollows.length === 0 && <EmptyList title="No user follow" />}
            <Grid container spacing={3}>
                {newFollows.map((follow) => (
                    <Grid key={follow.id} item md={4}>
                        <DashboardFollowItem follow={follow} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
