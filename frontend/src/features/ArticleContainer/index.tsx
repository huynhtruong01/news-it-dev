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
        limit: 6,
        page: 1,
        createdAt: Order.DESC,
    })
    const [newsList, setNewsList] = useState<INews[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [status, setStatus] = useState<INewsStatus>(NewsFilters.LATEST)
    const [total, setTotal] = useState<number>(0)

    // FETCH ALL NEWS HERE
    useEffect(() => {
        ;(async () => {
            try {
                if (filters.page === 1) setLoading(true)

                const res = await newsApi.getAllNews(filters)
                if (filters.page === 1) {
                    setNewsList(res.data.news)
                } else {
                    setNewsList((prev) => [...prev, ...res.data.news])
                }

                setTotal(res.data.total)
            } catch (error) {
                throw new Error(error as string)
            }
            setLoading(false)
        })()
    }, [filters])

    useEffect(() => {
        const handleScrollList = async () => {
            try {
                if (
                    window.innerHeight + window.scrollY + 10 >=
                    document.body.scrollHeight
                ) {
                    setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
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
