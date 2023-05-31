import { newsList } from '@/data'
import { theme } from '@/utils'
import { Box, BoxProps, Divider, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IFilters, INews } from '@/models'
import { Order, Status } from '@/enums'
import { newsApi } from '@/api'

export interface INewsSideRightRelationProps extends BoxProps {
    newsId: number
    hashTagIds: number[]
}

export function NewsSideRightRelation({
    hashTagIds,
    newsId,
    ...rest
}: INewsSideRightRelationProps) {
    const [newsTagsList, setNewsTagsList] = useState<INews[]>([])
    const [newHashTagIds, setNewHashTagIds] = useState<number[]>([])
    // CREATE STATE SAVE NEWS LIST
    // FETCH NEWS BY HASH TAGS IDS FOR RELATIONS

    useEffect(() => {
        if (newHashTagIds.length === hashTagIds.length || !hashTagIds) return
        ;(async () => {
            try {
                const filters: IFilters = {
                    page: 1,
                    limit: 5,
                    createdAt: Order.DESC,
                    hashTagIds: hashTagIds.join(','),
                    status: Status.PUBLIC,
                }
                const res = await newsApi.getNewsByTagIds(filters)

                const newNewsList = res.data.news.filter((n: INews) => n.id !== newsId)
                setNewsTagsList(newNewsList)
                setNewHashTagIds(hashTagIds)
            } catch (error) {
                throw new Error(error as string)
            }
        })()
    }, [])

    return (
        <Box {...rest} component={Paper} borderRadius={theme.spacing(0.75)}>
            <Typography
                component="h3"
                variant="h6"
                fontWeight={700}
                padding={theme.spacing(1.5, 2)}
                sx={{
                    a: {
                        color: theme.palette.primary.main,
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },
                }}
            >
                Read next
            </Typography>

            <Stack component="ul">
                {newsTagsList.map((news, index) => (
                    <Box key={news.id} component="li" padding={theme.spacing(2, 2, 0)}>
                        <Box paddingBottom={2}>
                            <Box
                                sx={{
                                    marginBottom: 1.5,
                                    img: {
                                        borderRadius: theme.spacing(0.75),
                                        overflow: 'hidden',
                                    },
                                }}
                            >
                                {/* WRITE LINK HERE */}
                                <Link to={`/news/${news.slug}`}>
                                    <img src={news.coverImage} alt={news.title} />
                                </Link>
                            </Box>
                            <Box>
                                <Typography
                                    component="h4"
                                    variant="h5"
                                    color={theme.palette.primary.light}
                                    fontWeight={700}
                                    sx={{
                                        a: {
                                            textDecoration: 'underline',
                                            '&:hover': {
                                                color: theme.palette.primary.dark,
                                            },
                                        },
                                    }}
                                >
                                    {/* WRITE LINK HERE */}
                                    <Link to={`/news/${news.slug}`}>{news.title}</Link>
                                </Typography>
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        marginTop: 0.75,
                                        marginBottom: 2.5,
                                        color: theme.palette.secondary.light,
                                    }}
                                >
                                    {news.sapo}
                                </Typography>
                                <Box
                                    display={'inline-block'}
                                    sx={{
                                        a: {
                                            color: theme.palette.primary.light,
                                            fontWeight: 600,
                                            textDecoration: 'underline',
                                            '&:hover': {
                                                color: theme.palette.primary.dark,
                                            },
                                        },
                                    }}
                                >
                                    {/* WRITE LINK HERE */}
                                    <Link to={`/news/${news.slug}`}>Read full news</Link>
                                </Box>
                            </Box>
                        </Box>
                        {index < newsList.length - 1 && <Divider />}
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
