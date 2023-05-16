import { Box } from '@mui/material'
import { SkeletonHashTagItem } from '@/components/Common/Skeleton/SkeletonHashTagList/components'

export function SkeletonHashTagList() {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 3,
            }}
        >
            {Array.from(new Array(12)).map((item, idx) => (
                <SkeletonHashTagItem key={idx} />
            ))}
        </Box>
    )
}
