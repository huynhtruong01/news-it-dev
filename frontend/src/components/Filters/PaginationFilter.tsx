import { Box, BoxProps, Pagination } from '@mui/material'
import { ChangeEvent } from 'react'

export interface IPaginationFiltersProps extends BoxProps {
    page: number
    total: number
    onPageChange: ((page: number) => void) | ((page: number) => Promise<void>)
}

export function PaginationFilters({
    page,
    total,
    onPageChange,
    ...rest
}: IPaginationFiltersProps) {
    const handlePageChange = async (e: ChangeEvent<unknown>, page: number) => {
        try {
            onPageChange(page)
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Box {...rest} width={'100%'}>
            <Pagination
                page={page}
                count={total}
                onChange={handlePageChange}
                shape="rounded"
                color="primary"
                sx={{
                    '.MuiPagination-ul': {
                        width: '100%',
                        justifyContent: 'center',
                    },
                }}
            />
        </Box>
    )
}
