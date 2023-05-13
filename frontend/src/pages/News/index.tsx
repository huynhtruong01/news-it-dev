import { Box } from '@mui/material'
import { NewsDetail, NewsSideLeft, NewsSideRight } from '@/pages/News/components'
import { newsDetail } from '@/data'
import { useEffect } from 'react'

// export interface INewsProps {}

export function News() {
    useEffect(() => {
        // TODO: UPDATE NEWS TITLE HERE
        document.title = newsDetail.title
    }, [])

    // TODO: FETCH NEWS DETAIL

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
