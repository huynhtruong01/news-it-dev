import { newsApi } from '@/api'
import { INews } from '@/models'
import { NewsDetail, NewsSideLeft, NewsSideRight } from '@/pages/News/components'
import { AppState } from '@/store'
import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'

export interface INewsProps {
    pSocket: Socket | null
}

function News({ pSocket }: INewsProps) {
    const [news, setNews] = useState<INews | null>(null)
    const params = useParams()

    // FETCH NEWS DETAIL
    useEffect(() => {
        if (!params.slug) return
        ;(async () => {
            try {
                const res = await newsApi.getNewsBySlug(params.slug as string)
                document.title = res.data.news.title
                setNews(res.data.news)
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [params])

    useEffect(() => {
        if (!params.slug || !pSocket) return
        pSocket.emit('joinRoom', params.slug)

        return () => {
            pSocket.emit('outRoom', params.slug)
        }
    }, [pSocket, params])

    return (
        news && (
            <Box minHeight={'100vh'}>
                <Grid container spacing={3}>
                    <Grid
                        item
                        sx={{
                            width: '64px',
                        }}
                    >
                        <NewsSideLeft news={news} />
                    </Grid>
                    <Grid item md={8}>
                        <NewsDetail news={news} />
                    </Grid>
                    <Grid item md>
                        <NewsSideRight news={news} />
                    </Grid>
                </Grid>
            </Box>
        )
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pSocket: state.socket.socket,
    }
}

export default connect(mapStateToProps, null)(News)
