import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { SearchFilter } from '../../components/Filters/SearchFilter'
import { HashTagTable } from '../../components/HashTags'
import { initHashTagFormValues, hashTags } from '../../data'
import { IFilters, IHashTag, IHashTagData } from '../../models'
import { theme } from '../../utils'
import { HashTagModalForm, ModalDelete } from '../../components/Modals'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '../../store'
import { getHashTags } from '../../store/hashTag/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'
import { useToast } from '../../hooks'
import { hashTagsApi } from '../../api'

export interface IHashTagProps {
    pHashTags: IHashTag[]
    pTotal: number
    pGetHashTags: (params: IFilters) => Promise<PayloadAction<unknown>>
}

function HashTags({ pHashTags, pTotal, pGetHashTags }: IHashTagProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
    })
    const [open, setOpen] = useState<boolean>(false)
    const [initValues, setInitValues] = useState<IHashTagData>(initHashTagFormValues)
    const { toastError, toastSuccess } = useToast()
    const [openDelete, setOpenDelete] = useState<boolean>(false)

    useEffect(() => {
        document.title = 'Hash Tags | Dashboard'
        pGetHashTags(filters)
    }, [])

    useEffect(() => {
        if (open || openDelete) return

        pGetHashTags(filters)
    }, [filters, open, openDelete])

    const handleSearchChange = (value: string) => {
        console.log(value)
    }

    const handleOpen = () => {
        setInitValues(initHashTagFormValues)
        setOpen(true)
    }

    const handleDeleteHashTag = async () => {
        try {
            if (initValues.id) {
                await hashTagsApi.deleteHashTag(initValues.id)
                toastSuccess(`Delete role ${initValues.name} successfully.`)
                setInitValues(initHashTagFormValues)
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
                        total={pTotal}
                        filters={filters}
                        setFilters={setFilters}
                        setInitValues={setInitValues}
                        setOpen={setOpen}
                        setOpenDelete={setOpenDelete}
                    />
                </Box>
            </Box>

            <HashTagModalForm initValues={initValues} open={open} setOpen={setOpen} />
            <ModalDelete
                title={'Delete tag?'}
                message={`Are you sure delete tag ${initValues.name}?`}
                open={openDelete}
                setOpen={setOpenDelete}
                onDelete={handleDeleteHashTag}
            />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pHashTags: state.hashTag.hashTags,
        pTotal: state.hashTag.total,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetHashTags: (params: IFilters) => dispatch(getHashTags(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HashTags)
