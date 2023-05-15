import { UserNewsInfo } from '@/components'
import { INews, IUser } from '@/models'
import { theme } from '@/utils'
import { Box, Paper } from '@mui/material'
import { ArticleIntro } from '.'
import { Link } from 'react-router-dom'

export interface IArticleItemProps {
    article: INews
}

export function ArticleItem({ article }: IArticleItemProps) {
    const { avatar, username } = article.user as IUser

    return (
        <Paper
            elevation={1}
            sx={{
                borderRadius: theme.spacing(1),
                overflow: 'hidden',
            }}
        >
            <Box component="article">
                <Box>
                    <Link to={`/news/${article.slug}`}>
                        <img src={article.coverImage} alt={article.title} />
                    </Link>
                </Box>
                <Box padding={2.5}>
                    <UserNewsInfo
                        avatar={avatar as string}
                        username={username}
                        createdAtNews={article?.createdAt || new Date()}
                        // MAKE LINK USER PROFILE HERE
                        link={`/profile/${article.user?.username}`}
                    />
                    <ArticleIntro article={article} />
                </Box>
            </Box>
        </Paper>
    )
}
