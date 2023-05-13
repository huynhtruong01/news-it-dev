import { INews } from '@/models'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, Button, Stack, Typography, alpha } from '@mui/material'
import { Link } from 'react-router-dom'

export interface IReadingListNewsItemProps {
    article: INews
}

export function ReadingListNewsItem({ article }: IReadingListNewsItemProps) {
    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            component="article"
            sx={{
                padding: theme.spacing(3, 3, 1),
            }}
        >
            <Stack direction={'row'} gap={2}>
                <Box>
                    {/* TODO: WRITE LINK HERE */}
                    <Link to={'/'}>
                        <Avatar
                            src={article.user?.avatar as string}
                            alt={article.user?.username as string}
                            sx={{
                                width: 32,
                                height: 32,
                            }}
                        />
                    </Link>
                </Box>
                <Box>
                    <Typography
                        component="h3"
                        fontSize={'18px'}
                        fontWeight={700}
                        sx={{
                            lineHeight: 1,
                            marginBottom: 0.25,
                            '&:hover': {
                                color: theme.palette.primary.dark,
                            },
                        }}
                    >
                        {/* TODO: WRITE LINK HERE */}
                        <Link to={`/news/${article.title}`}>{article.title}</Link>
                    </Typography>
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: theme.typography.body2,
                            gap: 0.5,
                            span: {
                                display: 'inline-block',
                                fontSize: theme.typography.body2,
                            },
                        }}
                    >
                        {/* TODO: WRITE LINK HERE */}
                        <Typography
                            component="span"
                            sx={{
                                a: {
                                    fontWeight: 600,
                                    '&:hover': {
                                        color: theme.palette.primary.dark,
                                    },
                                },
                            }}
                        >
                            <Link to={`/`}>{article.user?.username}</Link>
                        </Typography>
                        <span> • </span>
                        <span>
                            {formatDate(article.createdAt || new Date(), 'MMM DD')}
                        </span>
                        <span> • </span>
                        <span>{article.readTimes} min read</span>
                        <span> • </span>
                        <Stack direction={'row'} gap={0.5}>
                            {article?.hashTags?.length &&
                                article?.hashTags.map((tag) => (
                                    <Typography
                                        component="span"
                                        key={tag.id}
                                        sx={{
                                            a: {
                                                display: 'inline-block',
                                                padding: theme.spacing(0.5, 0.9),
                                                borderRadius: theme.spacing(0.75),
                                                '&:hover': {
                                                    backgroundColor: alpha(
                                                        theme.palette.grey[700],
                                                        0.1
                                                    ),
                                                    boxShadow: `0 0 1px ${theme.palette.grey[700]}`,
                                                },
                                            },
                                        }}
                                    >
                                        {/* TODO: WRITE LINK HERE */}
                                        <Link to={`/tags/${tag.name}`}>#{tag.name}</Link>
                                    </Typography>
                                ))}
                        </Stack>
                    </Typography>
                </Box>
            </Stack>
            <Button
                variant="contained"
                sx={{
                    padding: theme.spacing(1, 2),
                    backgroundColor: 'transparent',
                    color: theme.palette.secondary.main,
                    borderRadius: theme.spacing(0.75),

                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.dark, 0.1),
                        color: theme.palette.primary.dark,
                    },
                }}
            >
                Archive
            </Button>
        </Stack>
    )
}
