import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import { red } from '@mui/material/colors'
import { useState, useEffect } from 'react'
import { SearchFilter, SelectFilter } from '../../components/Filters'
import { UserModalForm } from '../../components/Modals'
import { UserTable } from '../../components/Users'
import { initUserFormValues, selectActive, selectsRole, users } from '../../data'
import { ActiveSelectValue, RoleSelectValue } from '../../enums'
import { IFilters, IUser, IUserData } from '../../models'
import { theme } from '../../utils'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '../../store'
import { getUsers } from '../../store/user/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'

interface IUsersProps {
    pUsers: IUser[]
    pGetUsers: () => Promise<PayloadAction<unknown>>
}

function Users({ pUsers, pGetUsers }: IUsersProps) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 5,
        page: 1,
    })
    const [open, setOpen] = useState<boolean>(false)
    const [initValues, setInitValues] = useState<IUserData>(initUserFormValues)

    useEffect(() => {
        document.title = 'Users | Dashboard'
        pGetUsers()
    }, [])

    useEffect(() => {
        console.log('filters home: ', filters)
    }, [filters])

    const handleSearchChange = (value: string) => {
        console.log(value)
    }

    const handleOpen = () => {
        setInitValues(initUserFormValues)
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
                            Add new user
                        </Button>
                        <SearchFilter
                            initValue={''}
                            placeholder={'Enter username...'}
                            onSearchChange={handleSearchChange}
                        />
                    </Box>

                    <Box>
                        <SelectFilter
                            selects={selectActive}
                            initValue={ActiveSelectValue.ALL}
                            label={'Active'}
                            marginRight={2}
                        />
                        <SelectFilter
                            selects={selectsRole}
                            initValue={RoleSelectValue.ALL}
                            label={'Role'}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        marginTop: theme.spacing(3),
                    }}
                >
                    <UserTable
                        users={pUsers}
                        filters={filters}
                        setFilters={setFilters}
                        setInitValues={setInitValues}
                        setOpen={setOpen}
                    />
                </Box>
            </Box>

            <UserModalForm initValues={initValues} open={open} setOpen={setOpen} />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUsers: state.user.users,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetUsers: () => dispatch(getUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
