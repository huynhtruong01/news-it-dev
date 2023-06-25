import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TableCell, TableRow, Box } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, MouseEvent, SetStateAction } from 'react'
import { userHeaders } from '../../data'
import { ActiveSelectName, RoleSelectName, StatusUser } from '../../enums'
import { IFilters, IUser, IUserData } from '../../models'
import { formatDate, generateOptions, statusColor, theme } from '../../utils'
import { TableCellImage, TableWrapper } from '../Common'

export interface IUserTableProps {
    users: IUser[]
    total: number
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    setInitValues: Dispatch<SetStateAction<IUserData>>
    setOpen: Dispatch<SetStateAction<boolean>>
    setOpenDelete: Dispatch<SetStateAction<boolean>>
    setUser: Dispatch<SetStateAction<IUser | null>>
}

export function UserTable({
    users,
    total,
    filters,
    setFilters,
    setInitValues,
    setOpen,
    setOpenDelete,
    setUser,
}: IUserTableProps) {
    const handleSetInitValues = (values: IUser) => {
        const roleOptionIds = generateOptions(values.roles || [])

        const newInitValues: IUserData = {
            id: values.id,
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            emailAddress: values.emailAddress,
            isAdmin: values.isAdmin,
            roleOptionIds,
        }

        setInitValues(newInitValues)
        setOpen(true)
    }

    const handleFiltersChange = (filters: IFilters) => {
        setFilters(filters)
    }

    const handleDelete = (e: MouseEvent, values: IUser) => {
        e.stopPropagation()
        setUser(values)
        setOpenDelete(true)
    }

    return (
        <TableWrapper
            total={total}
            listHead={userHeaders}
            filters={filters}
            onFiltersChange={handleFiltersChange}
        >
            {users.map((user) => (
                <TableRow
                    key={user.id}
                    sx={{
                        cursor: 'pointer',
                    }}
                    onClick={() => handleSetInitValues(user)}
                >
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCellImage src={user.avatar} alt={user.username} />
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.emailAddress}</TableCell>
                    <TableCell align="center">{user.newsCount}</TableCell>
                    <TableCell align="center">{formatDate(user.createdAt)}</TableCell>
                    <TableCell align="center">
                        {user.isAdmin ? RoleSelectName.ADMIN : RoleSelectName.USER}
                    </TableCell>
                    <TableCell align="center">
                        <Box
                            sx={{
                                backgroundColor: statusColor(
                                    user.isActive
                                        ? StatusUser.ACTIVE
                                        : StatusUser.INACTIVE
                                )[0],
                                color: statusColor(
                                    user.isActive
                                        ? StatusUser.ACTIVE
                                        : StatusUser.INACTIVE
                                )[1],
                                padding: theme.spacing(0.5, 1),
                                borderRadius: theme.spacing(0.5),
                            }}
                        >
                            {user.isActive
                                ? ActiveSelectName.ACTIVE
                                : ActiveSelectName.INACTIVE}
                        </Box>
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
                            onClick={(e) => handleDelete(e, user)}
                        >
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableWrapper>
    )
}
