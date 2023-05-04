import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TableCell, TableRow } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { userHeaders } from '../../data'
import { ActiveSelectName, RoleSelectName } from '../../enums'
import { IFilters, IUser, IUserData } from '../../models'
import { formatDate, theme } from '../../utils'
import { TableWrapper } from '../Common/TableWrapper'
import { EMPTY_IMG } from '../../consts'

export interface IUserTableProps {
    users: IUser[]
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    setInitValues: Dispatch<SetStateAction<IUserData>>
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function UserTable({
    users,
    filters,
    setFilters,
    setInitValues,
    setOpen,
}: IUserTableProps) {
    const handleSetInitValues = (values: IUser) => {
        const newInitValues: IUserData = {
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            emailAddress: values.emailAddress,
            isAdmin: values.isAdmin,
        }

        setInitValues(newInitValues)
        setOpen(true)
    }

    const handleFiltersChange = (filters: IFilters) => {
        console.log('filters: ', filters)
        setFilters(filters)
    }

    const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = EMPTY_IMG
    }

    return (
        <TableWrapper<IUser>
            listBody={users}
            listHead={userHeaders}
            filters={filters}
            onFiltersChange={handleFiltersChange}
        >
            {users.map((user) => (
                <TableRow
                    key={user.id}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: theme.palette.grey[100],
                        },

                        '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.grey[200],
                        },
                    }}
                    onClick={() => handleSetInitValues(user)}
                >
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',

                            img: {
                                width: 50,
                                height: 50,
                                margin: 'auto',
                                borderRadius: 0.5,
                            },
                        }}
                    >
                        <img
                            src={user.avatar}
                            alt={user.username}
                            onError={handleImageError}
                        />
                    </TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.firstName}</TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">{user.emailAddress}</TableCell>
                    <TableCell align="center">{user.newsCount}</TableCell>
                    <TableCell align="center">{formatDate(user.createdAt)}</TableCell>
                    <TableCell align="center">
                        {user.isAdmin ? RoleSelectName.ADMIN : RoleSelectName.USER}
                    </TableCell>
                    <TableCell align="center">
                        {user.isActive
                            ? ActiveSelectName.ACTIVE
                            : ActiveSelectName.INACTIVE}
                    </TableCell>
                    <TableCell align="center">
                        <Button
                            variant="contained"
                            sx={{
                                minWidth: 'auto',
                                backgroundColor: red[700],

                                '&:hover': {
                                    backgroundColor: red[900],
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                console.log('delete')
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableWrapper>
    )
}
