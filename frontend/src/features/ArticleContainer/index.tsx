import { Box, BoxProps } from '@mui/material'
import { ArticleHeader, ArticleList } from '@/features/ArticleContainer/components'
import { newsList } from '@/data'

export type IArticleContainer = BoxProps

export function ArticleContainer({ ...rest }: IArticleContainer) {
    return (
        <Box {...rest}>
            <Box>
                <ArticleHeader marginBottom={1} />
                <ArticleList articleList={newsList} />
            </Box>
        </Box>
    )
}
