import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, Stack, TableCell, TableRow, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { Dispatch, MouseEvent, SetStateAction, useMemo, useState } from 'react'
import { keyNewsInitValues, newsHeaders } from '../../data'
import {
    IFilters,
    INews,
    INewsData,
    INewsTable,
    IOptionItem,
    IReport,
    IStatus,
} from '../../models'
import { formatDate, setNewValues, statusColor, theme } from '../../utils'
import { TableCellImage, TableWrapper } from '../Common'
import FlagIcon from '@mui/icons-material/Flag'
import { ModalReports } from '../Modals'

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
    const [reporters, setReporters] = useState<IReport[]>([])
    const [openReporters, setOpenReporters] = useState<boolean>(false)

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

    const handleOpenReporters = (reporters: IReport[]) => {
        setOpenReporters(true)
        setReporters(reporters)
    }

    return (
        <TableWrapper
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
                    <TableCellImage
                        src={item.coverImage as string}
                        alt={item.title}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            img: {
                                width: 80,
                                height: 50,
                                borderRadius: 0.5,
                            },
                        }}
                    />
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
                                        fontSize: theme.typography.body2,
                                    }}
                                >
                                    {tag.name}
                                </Typography>
                            ))}
                        </Box>
                    </TableCell>
                    <TableCell align="center">
                        <Box
                            sx={{
                                textTransform: 'capitalize',
                                backgroundColor: statusColor(item.status as IStatus)[0],
                                color: statusColor(item.status as IStatus)[1],
                                textAlign: 'center',
                                fontWeight: 500,
                                maxWidth: 80,
                                margin: 'auto',
                                padding: theme.spacing(0.5, 1),
                                borderRadius: theme.spacing(0.5),
                            }}
                        >
                            {item.status}
                        </Box>
                    </TableCell>
                    <TableCell align="center">{formatDate(item.createdAt)}</TableCell>
                    <TableCell align="center">
                        <Stack direction={'row'} gap={0.5}>
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
                            <Button
                                variant="contained"
                                sx={{
                                    minWidth: 'auto',
                                    backgroundColor: theme.palette.primary.light,

                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main,
                                    },
                                }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleOpenReporters(item.reporterNews as IReport[])
                                }}
                            >
                                <FlagIcon fontSize="small" />
                            </Button>
                        </Stack>
                    </TableCell>
                </TableRow>
            ))}
            <ModalReports
                open={openReporters}
                setOpen={setOpenReporters}
                reporters={reporters}
            />
        </TableWrapper>
    )
}
