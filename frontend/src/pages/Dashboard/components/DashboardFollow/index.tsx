import { EmptyList } from '@/components/Common'
import { INewsFilters, IUser } from '@/models'
import {
    DashboardFollowFilters,
    DashboardFollowItem,
} from '@/pages/Dashboard/components/DashboardFollow/components'
import { Box, BoxProps, Grid, Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TitleDashboard } from '..'

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
    const { t } = useTranslation()
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
        <Box width={'100%'} {...rest}>
            <Stack
                direction={{
                    md: 'row',
                    xs: 'column',
                }}
                justifyContent={{
                    md: 'space-between',
                    xs: 'center',
                }}
                alignItems={{
                    md: 'center',
                    xs: 'flex-start',
                }}
                gap={2}
                marginBottom={2}
                width={{
                    md: 'auto',
                    xs: '100%',
                }}
            >
                <TitleDashboard text={title} nums={numFollows} />
                <DashboardFollowFilters setFilters={setFilters} />
            </Stack>

            {newFollows.length === 0 && <EmptyList title={t('empty.no_user_follow')} />}
            <Grid container spacing={2}>
                {newFollows.map((follow) => (
                    <Grid key={follow.id} item xs={12} sm={6} md={4}>
                        <DashboardFollowItem follow={follow} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
