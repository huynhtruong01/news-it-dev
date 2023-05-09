import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TableCell, TableRow, Box } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, SetStateAction, MouseEvent } from 'react'
import { keyRoleInitValues, roleHeaders } from '../../data'
import { IFilters, IRoleData, IRole } from '../../models'
import { formatDate, setNewValues, theme } from '../../utils'
import { TableWrapper, BoxColor } from '../Common'

export interface IRoleTableProps {
    roles: IRole[]
    total: number
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    setInitValues: Dispatch<SetStateAction<IRoleData>>
    setOpen: Dispatch<SetStateAction<boolean>>
    setOpenDelete: Dispatch<SetStateAction<boolean>>
}

export function RoleTable({
    roles,
    total,
    filters,
    setFilters,
    setInitValues,
    setOpen,
    setOpenDelete,
}: IRoleTableProps) {
    const handleSetInitValues = (values: IRole) => {
        const newInitValues: IRoleData = setNewValues<IRoleData>(
            values,
            keyRoleInitValues
        )

        setInitValues(newInitValues)
        setOpen(true)
    }

    const handleFiltersChange = (filters: IFilters) => {
        console.log('filters: ', filters)
        setFilters(filters)
    }

    const handleDelete = (e: MouseEvent, values: IRole) => {
        e.stopPropagation()

        const newInitValues: IRoleData = setNewValues<IRoleData>(
            values,
            keyRoleInitValues
        )
        setInitValues(newInitValues)
        setOpenDelete(true)
    }

    return (
        <TableWrapper<IRole>
            total={total}
            listHead={roleHeaders}
            filters={filters}
            onFiltersChange={handleFiltersChange}
        >
            {roles.map((role) => (
                <TableRow
                    key={role.id}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: theme.palette.grey[100],
                        },

                        '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.grey[200],
                        },
                    }}
                    onClick={() => handleSetInitValues(role)}
                >
                    <TableCell align="center">{role.id}</TableCell>
                    <TableCell align="center">{role.name}</TableCell>
                    <TableCell align="center">
                        <BoxColor color={role.color} />
                    </TableCell>
                    <TableCell align="center">{formatDate(role.createdAt)}</TableCell>
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
                            onClick={(e) => handleDelete(e, role)}
                        >
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableWrapper>
    )
}
