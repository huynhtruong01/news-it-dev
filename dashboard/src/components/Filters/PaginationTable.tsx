import { TablePagination } from '@mui/material'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export interface IPaginationTableProps {
    total: number
    page: number
    rowsPerPage: number
    setPage: Dispatch<SetStateAction<number>>
    setRowsPerPage: Dispatch<SetStateAction<number>>
}

export function PaginationTable({
    total,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
}: IPaginationTableProps) {
    const handleChangeRowsPerPage = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(0)
    }

    const handleChangePage = (
        e: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            component="div"
            SelectProps={{
                inputProps: {
                    'aria-label': 'rows per page',
                },
                native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}
