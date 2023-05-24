import { ArticleItem } from '@/features/ArticleContainer/components'
import { INews } from '@/models'
import { Box, Grid } from '@mui/material'
import { useMemo } from 'react'
import { EmptyList } from '@/components/Common'

export interface IDashboardReadingListProps {
    saves?: INews[]
}

export function DashboardReadingList({ saves }: IDashboardReadingListProps) {
    const newSaves = useMemo(() => {
        return saves?.length ? saves : []
    }, [])

    return (
        <Box>
            {newSaves.length === 0 && <EmptyList title="No news save" />}
            <Grid container spacing={2}>
                {newSaves.map((save) => (
                    <Grid key={save.id} item md={6}>
                        <ArticleItem article={save} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
