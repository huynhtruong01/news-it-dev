import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TableCell, TableRow, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, SetStateAction, MouseEvent } from 'react'
import { tagHeaders } from '../../data'
import { IFilters, IHashTag, IHashTagData, IHashTagTable } from '../../models'
import { formatDate, theme } from '../../utils'
import { TableWrapper, BoxColor, TableCellImage } from '../Common'

export interface IHashTagTableProps {
    tags: IHashTag[]
    total: number
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    setInitValues: Dispatch<SetStateAction<IHashTagData>>
    setOpen: Dispatch<SetStateAction<boolean>>
    setOpenDelete: Dispatch<SetStateAction<boolean>>
}

export function HashTagTable({
    tags,
    total,
    filters,
    setFilters,
    setInitValues,
    setOpen,
    setOpenDelete,
}: IHashTagTableProps) {
    const handleSetInitValues = (values: IHashTagTable) => {
        const newInitValues: IHashTagData = {
            id: values.id,
            name: values.name,
            description: values.description,
            color: values.color,
            iconImage: values.iconImage,
        }

        setInitValues(newInitValues)
        setOpen(true)
    }

    const handleFiltersChange = (filters: IFilters) => {
        console.log('filters: ', filters)
        setFilters(filters)
    }

    const handleDelete = (e: MouseEvent, values: IHashTag) => {
        e.stopPropagation()

        const newInitValues: IHashTagData = {
            id: values.id,
            name: values.name,
            description: values.description,
            color: values.color,
            iconImage: values.iconImage,
        }
        setInitValues(newInitValues)
        setOpenDelete(true)
    }

    return (
        <TableWrapper<IHashTag>
            total={total}
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
                    <TableCellImage src={tag.iconImage} alt={tag.name} />
                    <TableCell align="center">{tag.name}</TableCell>
                    <TableCell
                        align="left"
                        sx={{
                            maxWidth: 150,
                        }}
                    >
                        <Typography noWrap>{tag.description}</Typography>
                    </TableCell>
                    <TableCell align="center">
                        <BoxColor color={tag.color} />
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
                            onClick={(e) => handleDelete(e, tag)}
                        >
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableWrapper>
    )
}
