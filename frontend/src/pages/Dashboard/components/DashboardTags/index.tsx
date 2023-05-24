import { IHashTag } from '@/models'
import { Box, Grid } from '@mui/material'
import { useMemo } from 'react'
import { DashboardTag } from '@/pages/Dashboard/components/DashboardTags/components'
import { EmptyList } from '@/components/Common'

export interface IDashboardTagsProps {
    tags?: IHashTag[]
}

export function DashboardTags({ tags }: IDashboardTagsProps) {
    const newTags = useMemo(() => {
        return tags?.length ? tags : []
    }, [tags])

    return (
        <Box>
            {newTags.length === 0 && <EmptyList title="No hash tag follow" />}
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
