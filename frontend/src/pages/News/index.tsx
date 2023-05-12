import { Box } from '@mui/material'
import { NewsDetail, NewsSideLeft, NewsSideRight } from '@/pages/News/components'
import { newsDetail } from '@/data'

// export interface INewsProps {}

export function News() {
    return (
        <Box minHeight={'100vh'}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '64px 7fr 3fr',
                    gap: 2,
                }}
            >
                <NewsSideLeft likes={104} comments={148} saves={27} />
                <NewsDetail />
                <NewsSideRight user={newsDetail.user || null} />
            </Box>
        </Box>
    )
}
