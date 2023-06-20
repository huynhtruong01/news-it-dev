import { Paper, Table, TableBody, TableContainer } from '@mui/material'
import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import { Order } from '../../enums'
import { IFilters, IOrder, ITableHeader } from '../../models'
import { PaginationTable } from '../Filters'
import { TableHeader } from './TableHeader'

export type ITableWrapperProps = {
    total: number
    listHead: readonly ITableHeader[]
    filters: IFilters
    onFiltersChange: (filters: IFilters) => void
    children: ReactNode
}

export function TableWrapper({
    total,
    listHead,
    filters,
    onFiltersChange,
    children,
}: ITableWrapperProps) {
    const [order, setOrder] = useState<IOrder>(Order.desc)
    const [orderBy, setOrderBy] = useState<string>('createdAt')
    const [page, setPage] = useState<number>(filters.page - 1)
    const [rowsPerPage, setRowsPerPage] = useState<number>(filters.limit)
    const [initFetch, setInitFetch] = useState<boolean>(false)
    const MAX_HEIGHT = 500

    useEffect(() => {
        if (initFetch) {
            const newFilters = {
                page: page + 1,
                limit: rowsPerPage,
                [`${orderBy}`]: order === Order.asc ? Order.ASC : Order.DESC,
            }

            onFiltersChange({ ...newFilters })
        } else {
            setInitFetch(true)
        }
    }, [page, rowsPerPage, order, orderBy])

    const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === Order.asc

        setOrder(isAsc ? Order.desc : Order.asc)
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
