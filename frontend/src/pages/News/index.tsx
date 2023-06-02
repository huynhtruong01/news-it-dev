import { SkeletonNewsDetail } from '@/components/Common'
import { INews } from '@/models'
import { NewsDetail, NewsSideLeft, NewsSideRight } from '@/pages/News/components'
import { AppDispatch, AppState } from '@/store'
import { resetNewsDetail } from '@/store/news'
import { getNews } from '@/store/news/thunkApi'
import { Box, Grid } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'

export interface INewsProps {
    pSocket: Socket | null
    pNewsDetail: INews | null
    pGetNewsDetail: (slug: string) => Promise<PayloadAction<unknown>>
    pResetNewsDetail: () => void
}

function News({ pSocket, pGetNewsDetail, pNewsDetail, pResetNewsDetail }: INewsProps) {
    const params = useParams()
    const [loading, setLoading] = useState<boolean>(true)

    // FETCH NEWS DETAIL
    useEffect(() => {
        pResetNewsDetail()
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
    }, [params.slug])

    useEffect(() => {
        if (pNewsDetail) {
            document.title = pNewsDetail.title
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
                        <Grid item xs={12} md={4}>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
