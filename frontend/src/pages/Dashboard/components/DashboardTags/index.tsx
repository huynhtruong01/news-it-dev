import { IHashTag, INewsFilters } from '@/models'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import {
    DashboardTag,
    DashboardTagFilters,
} from '@/pages/Dashboard/components/DashboardTags/components'
import { EmptyList } from '@/components/Common'
import { useTranslation } from 'react-i18next'

export interface IDashboardTagsProps {
    tags: IHashTag[]
    numTags: number
}

export function DashboardTags({ tags, numTags }: IDashboardTagsProps) {
    const { t } = useTranslation()
    const [filters, setFilters] = useState<INewsFilters>({
        search: '',
    })

    const newTags = useMemo(() => {
        const searchSaves = tags.filter((n) => {
            if (!filters.search || filters.search === '') return true
            return (filters.search as string)
                .toLowerCase()
                .split(' ')
                .filter((x) => !!x)
                .some((w) => n.name.toLowerCase().includes(w))
        })

        return tags.length && searchSaves.length ? searchSaves : []
    }, [tags, filters])

    return (
        <Box>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={2}
            >
                <Typography component="h2" variant="h6" fontWeight={700}>
                    {t('dashboard.following_tags')} ({numTags})
                </Typography>
                <DashboardTagFilters setFilters={setFilters} />
            </Stack>

            {newTags.length === 0 && <EmptyList title={t('empty.no_hash_tag_follow')} />}
            <Grid container spacing={3}>
                {newTags.map((tag) => (
                    <Grid key={tag.id} item md={4}>
                        <DashboardTag tag={tag} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
