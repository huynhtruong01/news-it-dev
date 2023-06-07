import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material'
import { ITableHeader, IOrder, IAlignTable } from '../../models'
import { Order } from '../../enums'
import { visuallyHidden } from '@mui/utils'
import { MouseEvent } from 'react'

export interface ITableHeaderProps {
    list: readonly ITableHeader[]
    order: IOrder
    orderBy: string
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
}

export function TableHeader({ list, order, orderBy, onRequestSort }: ITableHeaderProps) {
    const createSortHandler = (property: string) => (e: MouseEvent<unknown>) => {
        onRequestSort(e, property)
    }

    const handleSortChange = (isSort: boolean, id: string) => {
        if (!isSort) return
        return createSortHandler(id)
    }

    return (
        <TableHead>
            <TableRow>
                {list.map((item) => (
                    <TableCell
                        key={item.id}
                        align={item.align ? (item.align as IAlignTable) : 'center'}
                    >
                        <TableSortLabel
                            active={orderBy === item.id}
                            direction={orderBy === item.id ? order : Order.asc}
                            onClick={handleSortChange(item.isSort, item.id)}
                            hideSortIcon={!item.isSort}
                        >
                            {item.label}
                            {item.isSort && orderBy === item.id && (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === Order.desc
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </Box>
                            )}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
