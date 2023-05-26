import { newsApi } from '@/api'
import { NewsList, TitlePage } from '@/components/Common'
import { NewsFilters, Order } from '@/enums'
import { IFilters, INews, INewsStatus } from '@/models'
import { SearchNewsFilters } from '@/pages/SearchNews/components'
import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// export interface ISearchNewsProps {}

export function SearchNews() {
    const [filters, setFilters] = useState<IFilters>({
        page: 1,
        limit: 100,
        createdAt: Order.DESC,
    })
    const [status, setStatus] = useState<INewsStatus>(NewsFilters.LATEST)
    const [searchParams] = useSearchParams()
    const [news, setNews] = useState<INews[]>([])
    const query = searchParams.get('q')

    useEffect(() => {
        document.title = 'Search Results for'
    }, [])

    useEffect(() => {
        // if (!query) return
        ;(async () => {
            try {
                const res = await newsApi.getAllNewsPublic({
                    ...filters,
                    search: query as string,
                })
                setNews(res.data.news)
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [searchParams, query, filters])

    return (
        <Box
            sx={{
                maxWidth: 1024,
                margin: 'auto',
            }}
        >
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
                >
                    <SearchNewsFilters
                        status={status}
                        setStatus={setStatus}
                        setFilters={setFilters}
                    />
                </Grid>
                <Grid item md>
                    <NewsList newsList={news} />
                </Grid>
            </Grid>
        </Box>
    )
}
