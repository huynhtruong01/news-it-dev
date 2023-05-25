import { newsApi } from '@/api'
import { NewsList, TitlePage } from '@/components/Common'
import { INews } from '@/models'
import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// export interface ISearchNewsProps {}

export function SearchNews() {
    const [searchParams] = useSearchParams()
    const [news, setNews] = useState<INews[]>([])
    const query = searchParams.get('q')

    useEffect(() => {
        document.title = 'Search Results for'
    }, [])

    useEffect(() => {
        if (!query) return
        ;(async () => {
            try {
                const res = await newsApi.getAllNewsPublic({
                    page: 1,
                    limit: 100,
                    search: query,
                })
                setNews(res.data.news)
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [searchParams, query])

    return (
        <Box>
            <Box>
                <TitlePage>Search results for {query}</TitlePage>
            </Box>

            <Grid
                container
                spacing={2}
                sx={{
                    marginTop: 2,
                }}
            >
                <Grid
                    item
                    sx={{
                        width: '240px',
                    }}
                ></Grid>
                <Grid item md>
                    <NewsList newsList={news} />
                </Grid>
            </Grid>
        </Box>
    )
}
