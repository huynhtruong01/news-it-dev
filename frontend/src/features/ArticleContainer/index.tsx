import { newsApi } from '@/api'
import { NewsFilters, Order } from '@/enums'
import { ArticleHeader, ArticleList } from '@/features/ArticleContainer/components'
import { IFilters, INews, INewsStatus } from '@/models'
import { Box, BoxProps } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export type IArticleContainer = BoxProps

export function ArticleContainer({ ...rest }: IArticleContainer) {
    const listRef = useRef<HTMLElement | null>(null)
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
        createdAt: Order.DESC,
    })
    const [newsList, setNewsList] = useState<INews[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [status, setStatus] = useState<INewsStatus>(NewsFilters.LATEST)
    const [hasMore, setHasMore] = useState<boolean>(false)

    // FETCH ALL NEWS HERE
    useEffect(() => {
        ;(async () => {
            try {
                setLoading(!hasMore)
                const res = await newsApi.getAllNews(filters)
                if (filters.page === 1) {
                    setNewsList(res.data.news)
                } else {
                    setNewsList((prev) => [...prev, ...res.data.news])
                }
            } catch (error) {
                throw new Error(error as string)
            }
            setLoading(false)
        })()
    }, [filters])

    useEffect(() => {
        const handleScrollList = async () => {
            try {
                if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
                    setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                    setHasMore(true)
                }
            } catch (error) {
                throw new Error(error as string)
            }
        }

        window.addEventListener('scroll', handleScrollList)

        return () => window.removeEventListener('scroll', handleScrollList)
    }, [])

    return (
        <Box {...rest} ref={listRef}>
            {!!newsList?.length && (
                <ArticleHeader
                    filters={filters}
                    status={status}
                    setStatus={setStatus}
                    setFilters={setFilters}
                    marginBottom={1}
                />
            )}
            <ArticleList loading={loading} articleList={newsList} />
        </Box>
    )
}
