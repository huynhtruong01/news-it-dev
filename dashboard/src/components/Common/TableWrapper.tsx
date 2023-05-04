import { Paper, Table, TableBody, TableContainer } from '@mui/material'
import { MouseEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { Order } from '../../enums'
import { IFilters, IOrder, ITableHeader } from '../../models'
import { TableHeader } from './TableHeader'
import { PaginationTable } from '../Filters'

export type ITableWrapperProps<ITableData> = {
    listBody: ITableData[]
    listHead: readonly ITableHeader[]
    filters: IFilters
    onFiltersChange: (filters: IFilters) => void
    children: ReactNode
}

export function TableWrapper<ITableData>({
    listBody,
    listHead,
    filters,
    onFiltersChange,
    children,
}: ITableWrapperProps<ITableData>) {
    const [order, setOrder] = useState<IOrder>(Order.ASC)
    const [orderBy, setOrderBy] = useState<string>('createdAt')
    const [page, setPage] = useState<number>(filters.page - 1)
    const [rowsPerPage, setRowsPerPage] = useState<number>(filters.limit)
    const MAX_HEIGHT = 500

    useEffect(() => {
        const newFilters = {
            page: page + 1,
            limit: rowsPerPage,
            [`${orderBy}`]: order,
        }

        onFiltersChange(newFilters)
    }, [page, rowsPerPage, order, orderBy])

    const total = useMemo(() => {
        return listBody.length
    }, [listBody])

    const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === Order.ASC

        setOrder(isAsc ? Order.DESC : Order.ASC)
        setOrderBy(property)
    }

    return (
        <Paper
            sx={{
                overflow: 'hidden',
            }}
        >
            <TableContainer
                sx={{
                    maxHeight: MAX_HEIGHT,
                }}
            >
                <Table stickyHeader>
                    <TableHeader
                        list={listHead}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>{children}</TableBody>
                </Table>
            </TableContainer>
            <PaginationTable
                total={total}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </Paper>
    )
}
