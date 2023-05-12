import { ArticleItem } from '@/features/ArticleContainer/components'
import { INews } from '@/models'
import { Box, BoxProps, Stack } from '@mui/material'

export interface IProfileNewsProps extends BoxProps {
    news: INews[]
}

export function ProfileNews({ news }: IProfileNewsProps) {
    return (
        <Stack gap={2}>
            {news.map((article) => (
                <ArticleItem key={article.id} article={article} />
            ))}
        </Stack>
    )
}
