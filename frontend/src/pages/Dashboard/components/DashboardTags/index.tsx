import { EmptyList, TitleContainerPage } from '@/components/Common'
import { IHashTag, INewsFilters } from '@/models'
import {
    DashboardTag,
    DashboardTagFilters,
} from '@/pages/Dashboard/components/DashboardTags/components'
import { Box, Grid } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TitleDashboard } from '..'

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
            <TitleContainerPage
                sx={{
                    marginBottom: 2,
                }}
            >
                <TitleDashboard
                    text={t('dashboard.following_tags') as string}
                    nums={numTags}
                />
                <DashboardTagFilters setFilters={setFilters} />
            </TitleContainerPage>

            {newTags.length === 0 && <EmptyList title={t('empty.no_hash_tag_follow')} />}
            <Grid container spacing={2}>
                {newTags.map((tag) => (
                    <Grid key={tag.id} item xs={12} sm={6} md={4}>
                        <DashboardTag tag={tag} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
