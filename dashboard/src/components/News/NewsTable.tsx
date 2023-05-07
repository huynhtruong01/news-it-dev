import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TableCell, TableRow, Typography, Box } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { newsHeaders } from '../../data'
import { IFilters, INews, INewsData, INewsTable } from '../../models'
import { formatDate, theme } from '../../utils'
import { TableWrapper } from '../Common'
import { EMPTY_IMG } from '../../consts'

export interface INewsTableProps {
    news: INews[]
    filters: IFilters
    setFilters: Dispatch<SetStateAction<IFilters>>
    setInitValues: Dispatch<SetStateAction<INewsData>>
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function NewsTable({
    news,
    filters,
    setFilters,
    setInitValues,
    setOpen,
}: INewsTableProps) {
    const handleSetInitValues = (values: INewsTable) => {
        const hashTagOptionIds = values.hashTags.map((item) => ({
            id: item.id,
            name: item.name,
        }))
        const newInitValues: INewsData = {
            title: values.title,
            sapo: values.sapo,
            content: values.content,
            coverImage: values.coverImage,
            thumbnailImage: values.thumbnailImage,
            readTimes: values.readTimes,
            hashTags: values.hashTags,
            status: values.status,
            hashTagOptionIds,
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
                    <TableCell align="center">
                        <Box
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
                                src={item.coverImage}
                                alt={item.title}
                                onError={handleImageError}
                            />
                        </Box>
                    </TableCell>
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
                    <TableCell align="center">{item.likes}</TableCell>
                    <TableCell align="center">{item.readTimes}</TableCell>
                    <TableCell
                        align="center"
                        sx={{
                            maxWidth: 150,
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
                                    key={tag}
                                    sx={{
                                        fontSize: '14px',
                                    }}
                                >
                                    {tag}
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
