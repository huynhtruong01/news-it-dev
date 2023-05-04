import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TableCell, TableRow } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, SetStateAction } from 'react'
import { roleHeaders } from '../../data'
import { IFilters, IRoleData, IRole } from '../../models'
import { formatDate, theme } from '../../utils'
import { TableWrapper } from '../Common'

export interface IRoleTableProps {
    roles: IRole[]
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    setInitValues: Dispatch<SetStateAction<IRoleData>>
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function RoleTable({
    roles,
    filters,
    setFilters,
    setInitValues,
    setOpen,
}: IRoleTableProps) {
    const handleSetInitValues = (values: IRole) => {
        const newInitValues: IRoleData = {
            name: values.name,
        }

        setInitValues(newInitValues)
        setOpen(true)
    }

    const handleFiltersChange = (filters: IFilters) => {
        console.log('filters: ', filters)
        setFilters(filters)
    }

    return (
        <TableWrapper<IRole>
            listBody={roles}
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
