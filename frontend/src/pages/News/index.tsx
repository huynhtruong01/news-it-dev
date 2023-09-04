import { SkeletonNewsDetail, Seo } from '@/components/Common'
import { Order } from '@/enums'
import { IFilters, INews } from '@/models'
import { NewsDetail, NewsSideLeft, NewsSideRight } from '@/pages/News/components'
import { AppDispatch, AppState } from '@/store'
import { setComment } from '@/store/comment'
import { getAllCommentsById } from '@/store/comment/thunkApi'
import { setLoadingComment } from '@/store/common'
import { resetNewsDetail } from '@/store/news'
import { getNews } from '@/store/news/thunkApi'
import { Box, Grid } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'

export interface INewsProps {
    pSocket: Socket | null
    pNewsDetail: INews | null
    pGetNewsDetail: (slug: string) => Promise<PayloadAction<unknown>>
    pResetNewsDetail: () => void
    pGetAllComments: (filter: IFilters) => Promise<PayloadAction<unknown>>
    pSetLoadingComment: (isLoading: boolean) => void
    pSetComments: () => void
}

function News({
    pSocket,
    pGetNewsDetail,
    pNewsDetail,
    pResetNewsDetail,
    pGetAllComments,
    pSetLoadingComment,
    pSetComments,
}: INewsProps) {
    const params = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [firstFetch, setFirstFetch] = useState<boolean>(false)

    // FETCH NEWS DETAIL
    useEffect(() => {
        if (!params.slug) return
        ;(async () => {
            try {
                setLoading(true)
                await pGetNewsDetail(params.slug as string)
            } catch (error) {
                throw new Error(error as string)
            }
            setLoading(false)
        })()

        return () => {
            pResetNewsDetail()
        }
    }, [params.slug])

    useEffect(() => {
        // get all comments by news id
        if (pNewsDetail && !firstFetch) {
            ;(async () => {
                pSetComments()
                pSetLoadingComment(true)
                try {
                    const newFilters = {
                        limit: 5,
                        page: 1,
                        createdAt: Order.DESC,
                        newsId: pNewsDetail.id,
                    }
                    await pGetAllComments(newFilters as IFilters)
                    setFirstFetch(true)
                } catch (error) {
                    enqueueSnackbar((error as Error).message, {
                        variant: 'error',
                    })
                }
                pSetLoadingComment(false)
            })()
        }
    }, [pNewsDetail])

    useEffect(() => {
        if (!params.slug || !pSocket) return
        pSocket.emit('joinRoom', params.slug)

        return () => {
            pSocket.emit('outRoom', params.slug)
        }
    }, [pSocket, params])

    return (
        <Box minHeight={'100vh'}>
            {pNewsDetail && (
                <Seo
                    title={pNewsDetail.title}
                    description={pNewsDetail.sapo}
                    image={pNewsDetail.coverImage}
                    url={window.location.href}
                />
            )}
            <Box>{loading && <SkeletonNewsDetail />}</Box>
            <Box>
                {pNewsDetail && !loading && (
                    <Grid container spacing={2}>
                        <Grid
                            item
                            sx={{
                                display: {
                                    md: 'block',
                                    xs: 'none',
                                },
                                width: '64px',
                            }}
                        >
                            <NewsSideLeft news={pNewsDetail} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <NewsDetail news={pNewsDetail} />
                        </Grid>
                        <Grid item xs={12} md>
                            <NewsSideRight news={pNewsDetail} />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pSocket: state.socket.socket,
        pNewsDetail: state.news.newsDetail,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetNewsDetail: (slug: string) => dispatch(getNews(slug)),
        pResetNewsDetail: () => dispatch(resetNewsDetail()),
        pGetAllComments: (params: IFilters) => dispatch(getAllCommentsById(params)),
        pSetLoadingComment: (isLoading: boolean) =>
            dispatch(setLoadingComment(isLoading)),
        pSetComments: () => dispatch(setComment(null)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
