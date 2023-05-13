import { Box, BoxProps } from '@mui/material'
import { ArticleHeader, ArticleList } from '@/features/ArticleContainer/components'
import { newsList } from '@/data'
import { useState } from 'react'
import { IFilters } from '@/models'
import { Order } from '@/enums'

export type IArticleContainer = BoxProps

export function ArticleContainer({ ...rest }: IArticleContainer) {
    const [filters, setFilters] = useState<IFilters>({
        limit: 20,
        page: 1,
        createdAt: Order.ASC,
    })

    // TODO: FETCH ALL NEWS HERE

    return (
        <Box {...rest}>
            <Box>
                <ArticleHeader setFilters={setFilters} marginBottom={1} />
                <ArticleList articleList={newsList} />
            </Box>
        </Box>
    )
}
