import { Box } from '@mui/material'
import { SkeletonNews } from '@/components/Common/Skeleton/SkeletonNewsList/components'

export function SkeletonNewsList() {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 3,
            }}
        >
            {Array.from(new Array(5)).map((item, idx) => (
                <SkeletonNews key={idx} />
            ))}
        </Box>
    )
}
