import { UserNewsInfo } from '@/components'
import { useLinkUser } from '@/hooks'
import { INews, IUser } from '@/models'
import { theme } from '@/utils'
import { Box, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import { ArticleIntro } from '.'

export interface IArticleItemProps {
    article: INews
}

export function ArticleItem({ article }: IArticleItemProps) {
    const linkUser = useLinkUser(article?.user as IUser)

    return (
        <Paper elevation={1}>
            <Box component="article">
                <Box
                    sx={{
                        maxHeight: 270,
                        minHeight: 200,
                        overflow: 'hidden',

                        img: {
                            height: '100%',
                            borderRadius: theme.spacing(0.75, 0.75, 0, 0),
                        },
                    }}
                >
                    <Link to={`/news/${article.slug}`}>
                        <img src={article.coverImage} alt={article.title} />
                    </Link>
                </Box>
                <Box padding={2.5}>
                    <UserNewsInfo user={article.user as IUser} link={linkUser} />
                    <ArticleIntro article={article} />
                </Box>
            </Box>
        </Paper>
    )
}
