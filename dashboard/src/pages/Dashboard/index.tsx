import { Box, Grid, Stack } from '@mui/material'
import { useEffect } from 'react'
import { DashboardCommentRecent, DashboardNews, StatisticalNums } from './components'
import { connect } from 'react-redux'
import { AppDispatch } from '../../store'
import { getStatisticalNums } from '../../store/common/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'
import { getCommentDashboard } from '../../store/comment/thunkApi'
import { IFilters } from '../../models'
import { getNews } from '../../store/news/thunkApi'
import { Order } from '../../enums'

export interface IDashboard {
    pGetStatisticalNums: () => Promise<PayloadAction<unknown>>
    pGetCommentsDashboard: (params: IFilters) => Promise<PayloadAction<unknown>>
    pGetNews: (params: IFilters) => Promise<PayloadAction<unknown>>
}

function Dashboard({ pGetStatisticalNums, pGetCommentsDashboard, pGetNews }: IDashboard) {
    useEffect(() => {
        document.title = 'Home | Dashboard'
        ;(async () => {
            try {
                const filters = {
                    page: 1,
                    limit: 5,
                }

                await pGetStatisticalNums()
                await pGetCommentsDashboard(filters)
                await pGetNews({ ...filters, createdAt: Order.DESC })
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [])

    return (
        <Box component="section">
            <Grid container spacing={2}>
                <Grid item md>
                    <Stack gap={2}>
                        <StatisticalNums />
                        <DashboardNews />
                    </Stack>
                </Grid>
                <Grid
                    item
                    sx={{
                        width: 300,
                    }}
                >
                    <DashboardCommentRecent />
                </Grid>
            </Grid>
        </Box>
    )
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetStatisticalNums: () => dispatch(getStatisticalNums()),
        pGetCommentsDashboard: (params: IFilters) =>
            dispatch(getCommentDashboard(params)),
        pGetNews: (params: IFilters) => dispatch(getNews(params)),
    }
}

export default connect(null, mapDispatchToProps)(Dashboard)
