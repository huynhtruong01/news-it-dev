import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SearchFilter } from '../../components/Filters/SearchFilter'
import { RoleModalForm } from '../../components/Modals'
import { RoleTable } from '../../components/Roles'
import { initRoleFormValues } from '../../data'
import { IFilters, IRole, IRoleData } from '../../models'
import { AppDispatch, AppState } from '../../store'
import { getRoles } from '../../store/role/thunkApi'
import { theme } from '../../utils'

export interface IRolesProps {
    pRoles: IRole[]
    pGetRoles: () => Promise<PayloadAction<unknown>>
}

function Roles({ pRoles, pGetRoles }: IRolesProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
    })
    const [open, setOpen] = useState<boolean>(false)
    const [initValues, setInitValues] = useState<IRoleData>(initRoleFormValues)

    useEffect(() => {
        document.title = 'Roles | Dashboard'
        pGetRoles()
    }, [])

    useEffect(() => {
        console.log('filters home: ', filters)
    }, [filters])

    const handleSearchChange = (value: string) => {
        console.log(value)
    }

    const handleOpen = () => {
        setInitValues(initRoleFormValues)
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
                            Add new role
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
                    <RoleTable
                        roles={pRoles}
                        filters={filters}
                        setFilters={setFilters}
                        setInitValues={setInitValues}
                        setOpen={setOpen}
                    />
                </Box>
            </Box>

            <RoleModalForm initValues={initValues} open={open} setOpen={setOpen} />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pRoles: state.role.roles,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetRoles: () => dispatch(getRoles()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles)
