import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SearchFilter } from '../../components/Filters/SearchFilter'
import { RoleModalForm, ModalDelete } from '../../components/Modals'
import { RoleTable } from '../../components/Roles'
import { initRoleFormValues } from '../../data'
import { IFilters, IRole, IRoleData } from '../../models'
import { AppDispatch, AppState } from '../../store'
import { getRoles } from '../../store/role/thunkApi'
import { theme } from '../../utils'
import { useToast } from '../../hooks'
import { rolesApi } from '../../api'
import { Order } from '../../enums'
import { deleteRole } from '../../store/role'

export interface IRolesProps {
    pRoles: IRole[]
    pTotal: number
    pGetRoles: (params: IFilters) => Promise<PayloadAction<unknown>>
    pDeleteRole: (data: number) => void
}

function Roles({ pRoles, pTotal, pGetRoles, pDeleteRole }: IRolesProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
        createdAt: Order.ASC,
    })
    const [open, setOpen] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [initValues, setInitValues] = useState<IRoleData>(initRoleFormValues)
    const { toastError, toastSuccess } = useToast()

    useEffect(() => {
        document.title = 'Roles | Dashboard'
    }, [])

    useEffect(() => {
        if (open || openDelete) return

        pGetRoles(filters)
    }, [filters])

    const handleSearchChange = (value: string) => {
        setFilters({ ...filters, search: value })
    }

    const handleOpen = () => {
        setInitValues(initRoleFormValues)
        setOpen(true)
    }

    const handleDeleteRole = async () => {
        try {
            if (initValues.id) {
                await rolesApi.deleteRole(initValues.id)
                pDeleteRole(initValues.id)
                toastSuccess(`Delete role ${initValues.name} successfully.`)
                setInitValues(initRoleFormValues)
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
                        total={pTotal}
                        filters={filters}
                        setFilters={setFilters}
                        setInitValues={setInitValues}
                        setOpen={setOpen}
                        setOpenDelete={setOpenDelete}
                    />
                </Box>
            </Box>

            <RoleModalForm initValues={initValues} open={open} setOpen={setOpen} />
            <ModalDelete
                title={'Delete role?'}
                message={`Are you sure delete role "${initValues.name}"?`}
                open={openDelete}
                setOpen={setOpenDelete}
                onDelete={handleDeleteRole}
            />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pRoles: state.role.roles,
        pTotal: state.role.total,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetRoles: (params: IFilters) => dispatch(getRoles(params)),
        pDeleteRole: (data: number) => dispatch(deleteRole(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles)
