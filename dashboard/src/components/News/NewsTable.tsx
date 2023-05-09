import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TableCell, TableRow, Typography, Box } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, SetStateAction, MouseEvent } from 'react'
import { keyNewsInitValues, newsHeaders } from '../../data'
import { IFilters, INews, INewsData, INewsTable, IOptionItem } from '../../models'
import { formatDate, setNewValues, theme } from '../../utils'
import { TableWrapper, TableCellImage } from '../Common'

export interface INewsTableProps {
    news: INews[]
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    setInitValues: Dispatch<SetStateAction<INewsData>>
    setOpen: Dispatch<SetStateAction<boolean>>
    setOpenDelete: Dispatch<SetStateAction<boolean>>
}

export function NewsTable({
    news,
    filters,
    setFilters,
    setInitValues,
    setOpen,
    setOpenDelete,
}: INewsTableProps) {
    const handleSetInitValues = (values: INewsTable) => {
        const hashTagOptionIds: IOptionItem[] = values.hashTags.map(
            (item) =>
                ({
                    id: item.id,
                    name: item.name,
                } as IOptionItem)
        )
        const newInitValues: INewsData = setNewValues<INewsData>(
            { ...values, hashTagOptionIds },
            keyNewsInitValues
        )

        setInitValues(newInitValues)
        setOpen(true)
    }

    const handleFiltersChange = (filters: IFilters) => {
        console.log('filters: ', filters)
        setFilters(filters)
    }

    const handleDelete = (e: MouseEvent, values: INews) => {
        e.stopPropagation()

        const newInitValues: INewsData = setNewValues<INewsData>(
            values,
            keyNewsInitValues
        )
        setInitValues(newInitValues)
        setOpenDelete(true)
    }

    return (
        <TableWrapper<INews>
            total={0}
            listHead={newsHeaders}
            filters={filters}
            onFiltersChange={handleFiltersChange}
        >
            {news.map((item) => (
                <TableRow
                    key={item.id}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: theme.palette.grey[100],
                        },

                        '&:nth-of-type(odd)': {
                            backgroundColor: theme.palette.grey[200],
                        },
                    }}
                    onClick={() => handleSetInitValues(item)}
                >
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCellImage src={item.coverImage} alt={item.title} />
                    <TableCell
                        align="left"
                        sx={{
                            maxWidth: 200,
                        }}
                    >
                        <Typography noWrap>{item.title}</Typography>
                    </TableCell>
                    <TableCell
                        align="left"
                        sx={{
                            maxWidth: 200,
                        }}
                    >
                        <Typography noWrap>{item.sapo}</Typography>
                    </TableCell>
                    <TableCell align="center">{item.newsViews}</TableCell>
                    <TableCell align="center">{item.numLikes || 0}</TableCell>
                    <TableCell align="center">{item.readTimes}</TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            minWidth: 100,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}
                        >
                            {item.hashTags.map((tag) => (
                                <Typography
                                    component="span"
                                    key={tag.id}
                                    sx={{
                                        fontSize: '14px',
                                    }}
                                >
                                    {tag.name}
                                </Typography>
                            ))}
                        </Box>
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            textTransform: 'capitalize',
                        }}
                    >
                        {item.status}
                    </TableCell>
                    <TableCell align="center">{formatDate(item.createdAt)}</TableCell>
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
                                handleDelete(e, item)
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
