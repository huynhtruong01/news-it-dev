import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { SearchFilter, SelectFilter } from '../../components/Filters'
import { NewsFilters, NewsTable } from '../../components/News'
import { initNewsFormValues, news, selectStatus } from '../../data'
import { IFilters, INews, INewsData } from '../../models'
import { Order, Status } from '../../enums'
import { theme } from '../../utils'
import { NewsModalForm } from '../../components/Modals'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '../../store'
import { getNews } from '../../store/news/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'

export interface INewsProps {
    pNews: INews[]
    pGetNews: (params: IFilters) => Promise<PayloadAction<unknown>>
}

function News({ pNews, pGetNews }: INewsProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
        createdAt: Order.ASC,
    })
    const [open, setOpen] = useState<boolean>(false)
    const [initValues, setInitValues] = useState<INewsData>(initNewsFormValues)

    useEffect(() => {
        document.title = 'News | Dashboard'
    }, [])

    useEffect(() => {
        console.log('filters home: ', filters)
        pGetNews(filters)
    }, [filters])

    const handleSearchChange = (value: string) => {
        console.log(value)
    }

    const handleOpen = () => {
        setInitValues(initNewsFormValues)
        setOpen(true)
    }

    return (
        <Box component="section">
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                        }}
                    >
                        <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            size="small"
                            sx={{
                                backgroundColor: red[700],
                                padding: theme.spacing(0.5, 2),

                                '&:hover': {
                                    backgroundColor: red[900],
                                },
                            }}
                            onClick={handleOpen}
                        >
                            Add new news
                        </Button>
                        <SearchFilter
                            initValue={''}
                            placeholder={'Enter title...'}
                            onSearchChange={handleSearchChange}
                        />
                    </Box>

                    <Box>
                        <NewsFilters filters={filters} setFilters={setFilters} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        marginTop: theme.spacing(3),
                    }}
                >
                    <NewsTable
                        news={pNews}
                        filters={filters}
                        setFilters={setFilters}
                        setInitValues={setInitValues}
                        setOpen={setOpen}
                    />
                </Box>
            </Box>

            <NewsModalForm initValues={initValues} open={open} setOpen={setOpen} />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pNews: state.news.news,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetNews: (params: IFilters) => dispatch(getNews(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
