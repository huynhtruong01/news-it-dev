import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { SearchFilter } from '../../components/Filters/SearchFilter'
import { HashTagTable } from '../../components/HashTags'
import { initHashTagFormValues, hashTags } from '../../data'
import { IFilters, IHashTag, IHashTagData } from '../../models'
import { theme } from '../../utils'
import { HashTagModalForm } from '../../components/Modals'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '../../store'
import { getHashTags } from '../../store/hashTag/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'

export interface IHashTagProps {
    pHashTags: IHashTag[]
    pGetHashTags: () => Promise<PayloadAction<unknown>>
}

function HashTags({ pHashTags, pGetHashTags }: IHashTagProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
    })
    const [open, setOpen] = useState<boolean>(false)
    const [initValues, setInitValues] = useState<IHashTagData>(initHashTagFormValues)

    useEffect(() => {
        document.title = 'Hash Tags | Dashboard'
        pGetHashTags()
    }, [])

    useEffect(() => {
        console.log('filters home: ', filters)
    }, [filters])

    const handleSearchChange = (value: string) => {
        console.log(value)
    }

    const handleOpen = () => {
        setInitValues(initHashTagFormValues)
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
                            Add new tag
                        </Button>
                        <SearchFilter
                            initValue={''}
                            placeholder={'Enter name...'}
                            onSearchChange={handleSearchChange}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        marginTop: theme.spacing(3),
                    }}
                >
                    <HashTagTable
                        tags={pHashTags}
                        filters={filters}
                        setFilters={setFilters}
                        setInitValues={setInitValues}
                        setOpen={setOpen}
                    />
                </Box>
            </Box>

            <HashTagModalForm initValues={initValues} open={open} setOpen={setOpen} />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pHashTags: state.hashTag.hashTags,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetHashTags: () => dispatch(getHashTags()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HashTags)
