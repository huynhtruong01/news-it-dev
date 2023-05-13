import { INews } from '@/models'
import { Box, BoxProps, Paper } from '@mui/material'
import { ReadingListNewsItem } from '.'

export interface IReadingListNewsProps extends BoxProps {
    news: INews[]
}

export function ReadingListNews({ news }: IReadingListNewsProps) {
    return (
        <Box component={Paper} elevation={1} paddingBottom={2}>
            <Box>
                {news.map((article) => (
                    <ReadingListNewsItem key={article.id} article={article} />
                ))}
            </Box>
        </Box>
    )
}
