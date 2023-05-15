import { newsApi } from '@/api'
import { INews } from '@/models'
import { NewsDetail, NewsSideLeft, NewsSideRight } from '@/pages/News/components'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// export interface INewsProps {}

export function News() {
    const [news, setNews] = useState<INews | null>(null)
    const params = useParams()

    // FETCH NEWS DETAIL
    useEffect(() => {
        if (params.slug) {
            ;(async () => {
                try {
                    const res = await newsApi.getNewsBySlug(params.slug as string)
                    document.title = res.data.news.title
                    setNews(res.data.news)
                } catch (error) {
                    throw new Error(error as string)
                }
            })()
        }
    }, [params])

    return (
        news && (
            <Box minHeight={'100vh'}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '64px 7fr 3fr',
                        gap: 2,
                    }}
                >
                    <NewsSideLeft news={news} />
                    <NewsDetail news={news} />
                    <NewsSideRight news={news} />
                </Box>
            </Box>
        )
    )
}
