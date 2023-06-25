import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TableCell, TableRow, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, MouseEvent, SetStateAction } from 'react'
import { keyInitValues, tagHeaders } from '../../data'
import { IFilters, IHashTag, IHashTagData, IHashTagTable } from '../../models'
import { formatDate, setNewValues } from '../../utils'
import { BoxColor, TableCellImage, TableWrapper } from '../Common'

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
        const newInitValues: IHashTagData = setNewValues<IHashTagData>(
            values,
            keyInitValues
        )

        setInitValues(newInitValues)
        setOpen(true)
    }

    const handleFiltersChange = (filters: IFilters) => {
        setFilters(filters)
    }

    const handleDelete = (e: MouseEvent, values: IHashTag) => {
        e.stopPropagation()

        const newInitValues: IHashTagData = setNewValues<IHashTagData>(
            values,
            keyInitValues
        )
        setInitValues(newInitValues)
        setOpenDelete(true)
    }

    return (
        <TableWrapper
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
                    }}
                    onClick={() => handleSetInitValues(tag)}
                >
                    <TableCell align="center">{tag.id}</TableCell>
                    <TableCellImage
                        type="icon"
                        src={tag.iconImage as string}
                        alt={tag.name}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            img: {
                                width: 'auto',
                                height: 'auto',
                                maxWidth: 80,
                                maxHeight: 65,
                                borderRadius: 0.5,
                            },
                        }}
                    />
                    <TableCell>{tag.name}</TableCell>
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
