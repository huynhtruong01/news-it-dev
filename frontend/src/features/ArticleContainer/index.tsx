import { newsApi } from '@/api'
import { NewsFilters, Order } from '@/enums'
import { ArticleHeader, ArticleList } from '@/features/ArticleContainer/components'
import { IFilters, INews, INewsStatus } from '@/models'
import { Box, BoxProps } from '@mui/material'
import { useEffect, useState } from 'react'

export type IArticleContainer = BoxProps

export function ArticleContainer({ ...rest }: IArticleContainer) {
    const [status, setStatus] = useState<INewsStatus>(NewsFilters.LATEST)
    const [filters, setFilters] = useState<IFilters>({
        limit: 20,
        page: 1,
        createdAt: Order.DESC,
    })
    const [newsList, setNewsList] = useState<INews[]>([])

    // TODO: FETCH ALL NEWS HERE
    useEffect(() => {
        ;(async () => {
            try {
                const res = await newsApi.getAllNews(filters)
                setNewsList([...res.data.news])
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [filters])

    // const handleLoadMore = () => {
    //     console.log('loading')
    //     setFilters((prev) => ({ ...prev, page: ++filters.page }))
    // }

    return (
        <Box {...rest}>
            <ArticleHeader
                filters={filters}
                status={status}
                setStatus={setStatus}
                setFilters={setFilters}
                marginBottom={1}
            />
            <ArticleList articleList={newsList} />
        </Box>
    )
}
