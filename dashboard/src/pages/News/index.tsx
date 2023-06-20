import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { SearchFilter } from '../../components/Filters'
import { NewsFilters, NewsTable } from '../../components/News'
import { IFilters, INews, INewsData } from '../../models'
import { Order } from '../../enums'
import { theme } from '../../utils'
import { NewsModalForm, ModalDelete } from '../../components/Modals'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '../../store'
import { getNews } from '../../store/news/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'
import { newsApi } from '../../api'
import { useToast } from '../../hooks'
import { getAllHashTags } from '../../store/hashTag/thunkApi'
import { initNewsFormValues } from '../../data'
import { deleteNews } from '../../store/news'

export interface INewsProps {
    pNews: INews[]
    pTotal: number
    pGetNews: (params: IFilters) => Promise<PayloadAction<unknown>>
    pGetHashTagSelects: () => Promise<PayloadAction<unknown>>
    pDeleteNews: (data: number) => void
}

function News({ pNews, pTotal, pGetNews, pGetHashTagSelects, pDeleteNews }: INewsProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
        createdAt: Order.DESC,
    })
    const [open, setOpen] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [initValues, setInitValues] = useState<INewsData>(initNewsFormValues)
    const [news, setNews] = useState<INews | null>(null)
    const { toastSuccess, toastError } = useToast()

    useEffect(() => {
        document.title = 'News | Dashboard'
        pGetHashTagSelects()
    }, [])

    useEffect(() => {
        pGetNews(filters)
    }, [filters])

    const handleSearchChange = (value: string) => {
        setFilters({ ...filters, search: value })
    }

    const handleOpen = () => {
        setInitValues(initNewsFormValues)
        setOpen(true)
    }

    const handleDeleteNews = async () => {
        try {
            if (initValues.id) {
                await newsApi.deleteNews(initValues.id)
                pDeleteNews(initValues.id)
                toastSuccess(`Delete news ${initValues.title} successfully.`)
                setInitValues(initNewsFormValues)
            }
        } catch (error) {
            toastError((error as Error).message)
        }
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
                        total={pTotal}
                        news={pNews}
                        filters={filters}
                        setFilters={setFilters}
                        setInitValues={setInitValues}
                        setOpen={setOpen}
                        setOpenDelete={setOpenDelete}
                        setNews={setNews}
                    />
                </Box>
            </Box>

            <NewsModalForm initValues={initValues} open={open} setOpen={setOpen} />
            <ModalDelete
                title={'Delete news?'}
                message={`Are you sure delete news "${news?.title}"?`}
                open={openDelete}
                setOpen={setOpenDelete}
                onDelete={handleDeleteNews}
            />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pNews: state.news.news,
        pTotal: state.news.total,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetNews: (params: IFilters) => dispatch(getNews(params)),
        pGetHashTagSelects: () => dispatch(getAllHashTags()),
        pDeleteNews: (data: number) => dispatch(deleteNews(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News)
