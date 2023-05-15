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

    // TODO: FETCH NEWS DETAIL

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
                    <NewsSideLeft
                        likes={news.numLikes as number}
                        comments={news.numComments as number}
                        saves={news.numSaves as number}
                    />
                    <NewsDetail news={news} />
                    <NewsSideRight user={news.user || null} />
                </Box>
            </Box>
        )
    )
}
