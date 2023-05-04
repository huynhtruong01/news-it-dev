import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TableCell, TableRow, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, SetStateAction } from 'react'
import { tagHeaders } from '../../data'
import { IFilters, IHashTag, IHashTagData, IHashTagTable } from '../../models'
import { formatDate, theme } from '../../utils'
import { TableWrapper } from '../Common'

export interface IHashTagTableProps {
    tags: IHashTag[]
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    setInitValues: Dispatch<SetStateAction<IHashTagData>>
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function HashTagTable({
    tags,
    filters,
    setFilters,
    setInitValues,
    setOpen,
}: IHashTagTableProps) {
    const handleSetInitValues = (values: IHashTagTable) => {
        const newInitValues: IHashTagData = {
            name: values.name,
            description: values.description,
        }

        setInitValues(newInitValues)
        setOpen(true)
    }

    const handleFiltersChange = (filters: IFilters) => {
        console.log('filters: ', filters)
        setFilters(filters)
    }

    return (
        <TableWrapper<IHashTag>
            listBody={tags}
            listHead={tagHeaders}
            filters={filters}
            onFiltersChange={handleFiltersChange}
        >
            {tags.map((tag) => (
                <TableRow
                    key={tag.id}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: theme.palette.grey[100],
                        },

                        '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.grey[200],
                        },
                    }}
                    onClick={() => handleSetInitValues(tag)}
                >
                    <TableCell align="center">{tag.id}</TableCell>
                    <TableCell align="center">{tag.name}</TableCell>
                    <TableCell
                        align="left"
                        sx={{
                            maxWidth: 150,
                        }}
                    >
                        <Typography noWrap>{tag.description}</Typography>
                    </TableCell>
                    <TableCell align="center">{formatDate(tag.createdAt)}</TableCell>
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
