import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SearchFilter } from '../../components/Filters'
import { UserModalForm, ModalDelete } from '../../components/Modals'
import { UserFilters, UserTable } from '../../components/Users'
import { initUserFormValues } from '../../data'
import { Order } from '../../enums'
import { IFilters, IUser, IUserData } from '../../models'
import { AppDispatch, AppState } from '../../store'
import { getUsers } from '../../store/user/thunkApi'
import { getAllRoles } from '../../store/role/thunkApi'
import { theme } from '../../utils'
import { useToast } from '../../hooks'
import { usersApi } from '../../api'
import { deleteUser } from '../../store/user'

interface IUsersProps {
    pUsers: IUser[]
    pTotal: number
    pGetUsers: (params: IFilters) => Promise<PayloadAction<unknown>>
    pGetAllRoles: () => Promise<PayloadAction<unknown>>
    pDeleteUser: (data: number) => void
}

function Users({ pUsers, pTotal, pGetUsers, pGetAllRoles, pDeleteUser }: IUsersProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
        createdAt: Order.ASC,
    })
    const [open, setOpen] = useState<boolean>(false)
    const [openDelete, setOpenDelete] = useState<boolean>(false)
    const [initValues, setInitValues] = useState<IUserData>(initUserFormValues)
    const [user, setUser] = useState<IUser | null>(null)
    const { toastSuccess, toastError } = useToast()

    useEffect(() => {
        document.title = 'Users | Dashboard'
        pGetAllRoles()
    }, [])

    useEffect(() => {
        if (open || openDelete) return

        pGetUsers(filters)
    }, [filters, open, openDelete])

    const handleSearchChange = (value: string) => {
        setFilters((prev) => ({ ...prev, search: value }))
    }

    const handleOpen = () => {
        setInitValues(initUserFormValues)
        setOpen(true)
    }

    const handleDeleteUser = async () => {
        try {
            if (initValues.id) {
                toastSuccess(`Delete user ${initValues.username} successfully.`)
                pDeleteUser(initValues.id)
                await usersApi.deleteUser(initValues.id)
                setInitValues(initUserFormValues)
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
                            Add new user
                        </Button>
                        <SearchFilter
                            initValue={''}
                            placeholder={'Enter username...'}
                            onSearchChange={handleSearchChange}
                        />
                    </Box>

                    <Box>
                        <UserFilters filters={filters} setFilters={setFilters} />
                    </Box>
                </Box>

                <Box
                    sx={{
                        marginTop: theme.spacing(3),
                    }}
                >
                    <UserTable
                        users={pUsers}
                        total={pTotal}
                        filters={filters}
                        setFilters={setFilters}
                        setInitValues={setInitValues}
                        setOpen={setOpen}
                        setOpenDelete={setOpenDelete}
                        setUser={setUser}
                    />
                </Box>
            </Box>

            <UserModalForm initValues={initValues} open={open} setOpen={setOpen} />
            <ModalDelete
                title={'Delete user?'}
                message={`Are you sure delete user "${user?.username}"?`}
                open={openDelete}
                setOpen={setOpenDelete}
                onDelete={handleDeleteUser}
            />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUsers: state.user.users,
        pTotal: state.user.total,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetUsers: (params: IFilters) => dispatch(getUsers(params)),
        pGetAllRoles: () => dispatch(getAllRoles()),
        pDeleteUser: (data: number) => dispatch(deleteUser(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
