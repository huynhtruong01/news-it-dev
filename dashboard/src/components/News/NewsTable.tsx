import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, TableCell, TableRow, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, MouseEvent, SetStateAction, useMemo } from 'react'
import { keyNewsInitValues, newsHeaders } from '../../data'
import { IFilters, INews, INewsData, INewsTable, IOptionItem } from '../../models'
import { formatDate, setNewValues } from '../../utils'
import { TableCellImage, TableWrapper } from '../Common'

export interface INewsTableProps {
    news: INews[]
    total: number
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    setInitValues: Dispatch<SetStateAction<INewsData>>
    setOpen: Dispatch<SetStateAction<boolean>>
    setOpenDelete: Dispatch<SetStateAction<boolean>>
    setNews: Dispatch<SetStateAction<INews | null>>
}

export function NewsTable({
    news,
    total,
    filters,
    setFilters,
    setInitValues,
    setOpen,
    setOpenDelete,
    setNews,
}: INewsTableProps) {
    const newNews = useMemo(() => {
        return news.length ? news : []
    }, [news])

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
        setFilters(filters)
    }

    const handleDelete = (e: MouseEvent, values: INews) => {
        e.stopPropagation()

        setNews(values)
        setOpenDelete(true)
    }

    return (
        <TableWrapper<INews>
            total={total}
            listHead={newsHeaders}
            filters={filters}
            onFiltersChange={handleFiltersChange}
        >
            {newNews.map((item) => (
                <TableRow
                    key={item.id}
                    sx={{
                        cursor: 'pointer',
                    }}
                    onClick={() => handleSetInitValues(item)}
                >
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCellImage src={item.coverImage as string} alt={item.title} />
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
