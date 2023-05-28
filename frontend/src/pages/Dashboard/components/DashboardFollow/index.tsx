import { INewsFilters, IUser } from '@/models'
import { Box, BoxProps, Grid, Stack, Typography } from '@mui/material'
import {
    DashboardFollowFilters,
    DashboardFollowItem,
} from '@/pages/Dashboard/components/DashboardFollow/components'
import { useMemo, useState } from 'react'
import { EmptyList } from '@/components/Common'

export interface IDashboardFollowProps extends BoxProps {
    title: string
    follows: IUser[]
    numFollows: number
}

export function DashboardFollow({
    follows,
    title,
    numFollows,
    ...rest
}: IDashboardFollowProps) {
    const [filters, setFilters] = useState<INewsFilters>({
        search: '',
    })

    const newFollows = useMemo(() => {
        const searchFollows = follows.filter((u) => {
            if (filters.search === '' || !filters.search) return true
            return (filters.search as string)
                .toLowerCase()
                .split(' ')
                .filter((x) => !!x)
                .some(
                    (w) =>
                        u.username.toLowerCase().includes(w) ||
                        u.lastName.toLowerCase().includes(w) ||
                        u.firstName.toLowerCase().includes(w)
                )
        })

        return follows.length && searchFollows.length ? searchFollows : []
    }, [follows, filters])

    return (
        <Box {...rest}>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={2}
            >
                <Typography component="h2" variant="h6" fontWeight={700}>
                    {title} ({numFollows})
                </Typography>
                <DashboardFollowFilters setFilters={setFilters} />
            </Stack>

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
