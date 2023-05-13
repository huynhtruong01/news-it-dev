import { IHashTag } from '@/models'
import { Box } from '@mui/material'
import { useMemo } from 'react'
import { DashboardTag } from '.'

export interface IDashboardTagsProps {
    tags?: IHashTag[]
}

export function DashboardTags({ tags }: IDashboardTagsProps) {
    const newTags = useMemo(() => {
        return tags?.length ? tags : []
    }, [tags])

    return (
        <Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: 2,
                }}
            >
                {newTags.map((tag) => (
                    <DashboardTag key={tag.id} tag={tag} />
                ))}
            </Box>
        </Box>
    )
}
