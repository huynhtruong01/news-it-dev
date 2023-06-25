import { newsApi } from '@/api'
import { NewsFilters, Order } from '@/enums'
import { ArticleHeader, ArticleList } from '@/features/ArticleContainer/components'
import { IFilters, INews, INewsStatus, IUser } from '@/models'
import { AppState } from '@/store'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export interface IArticleContainer {
    pUser: IUser | null
}

function ArticleContainer({ pUser }: IArticleContainer) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 6,
        page: 1,
        createdAt: Order.DESC,
        hashTag: pUser?.hashTags?.map((t) => t.id).join(',') || '',
        type: pUser ? NewsFilters.RELEVANT : '',
    })
    const [newsList, setNewsList] = useState<INews[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [status, setStatus] = useState<INewsStatus>(
        pUser ? NewsFilters.RELEVANT : NewsFilters.LATEST
    )
    const [total, setTotal] = useState<number>(0)

    // FETCH ALL NEWS HERE
    useEffect(() => {
        ;(async () => {
            try {
                if (filters.page === 1) setLoading(true)
                const newFilters = pUser?.id
                    ? { ...filters, userId: pUser?.id }
                    : { ...filters }

                const res = await newsApi.getAllNewsPublic(newFilters)
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
                    window.innerHeight + window.scrollY + 5 >=
                        document.body.scrollHeight &&
                    newsList.length <= total
                ) {
                    setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                }
            } catch (error) {
                throw new Error(error as string)
            }
        }

        window.addEventListener('scroll', handleScrollList)

        return () => window.removeEventListener('scroll', handleScrollList)
    }, [total, newsList])

    return (
        <Box width="100%">
            <ArticleHeader
                filters={filters}
                status={status}
                setStatus={setStatus}
                setFilters={setFilters}
            />
            <ArticleList loading={loading} articleList={newsList} />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(ArticleContainer)
