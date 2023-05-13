import { ArticleItem } from '@/features/ArticleContainer/components'
import { INews } from '@/models'
import { Box, Stack } from '@mui/material'
import { useMemo } from 'react'

export interface IDashboardReadingListProps {
    saves?: INews[]
}

export function DashboardReadingList({ saves }: IDashboardReadingListProps) {
    const newSaves = useMemo(() => {
        return saves?.length ? saves : []
    }, [])

    return (
        <Box>
            <Stack gap={2}>
                {newSaves.map((save) => (
                    <ArticleItem key={save.id} article={save} />
                ))}
            </Stack>
        </Box>
    )
}
