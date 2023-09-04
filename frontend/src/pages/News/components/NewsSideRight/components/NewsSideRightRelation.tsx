import { newsApi } from '@/api'
import { SkeletonRelationList } from '@/components/Common'
import { INews } from '@/models'
import { theme } from '@/utils'
import {
    Box,
    BoxProps,
    Paper,
    Stack,
    Typography,
    alpha,
    useMediaQuery,
} from '@mui/material'
import { TFunction } from 'i18next'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export interface INewsSideRightRelationProps extends BoxProps {
    news: INews
    hashTagIds: number[]
    t: TFunction<'translation', undefined, 'translation'>
}

export function NewsSideRightRelation({ news, t, ...rest }: INewsSideRightRelationProps) {
    const isMiddleScreen = useMediaQuery('(min-width:320px)')
    const [loading, setLoading] = useState<boolean>(false)
    const [newsTagsList, setNewsTagsList] = useState<INews[]>([])

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const res = await newsApi.recommendationNews({
                    newsId: news.id,
                    hashTag: news?.hashTagIds?.join(','),
                })

                const newNewsList = res.data.news.filter((n: INews) => n.id !== news.id)
                setNewsTagsList(newNewsList)
            } catch (error) {
                throw new Error(error as string)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <Box {...rest} component={Paper} borderRadius={theme.spacing(0.75)}>
            <Typography
                component="h3"
                variant={'h6'}
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
                {t('news.read_next')}
            </Typography>

            {loading && <SkeletonRelationList noPaper />}
            <Stack component="ul">
                {!loading &&
                    newsTagsList.map((news) => (
                        <Box
                            key={news.id}
                            component="li"
                            padding={theme.spacing(2, 2, 0)}
                            sx={{
                                '&:not(:last-of-type)': {
                                    borderBottom: `1px solid ${alpha(
                                        theme.palette.secondary.main,
                                        0.075
                                    )}`,
                                },
                            }}
                        >
                            <Box paddingBottom={2}>
                                <Box
                                    sx={{
                                        marginBottom: 1.5,
                                        maxHeight: {
                                            lg: 200,
                                            xs: 130,
                                        },
                                        img: {
                                            display: 'block',
                                            borderRadius: theme.spacing(0.75),
                                            height: '100%',
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
                                        variant={isMiddleScreen ? 'h6' : 'h5'}
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
                                        <Link to={`/news/${news.slug}`}>
                                            {news.title}
                                        </Link>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: {
                                                md: '-webkit-box',
                                                xs: 'none',
                                            },
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            fontWeight: 400,
                                            marginTop: 0.75,

                                            color: theme.palette.secondary.light,
                                        }}
                                    >
                                        {news.sapo}
                                    </Typography>
                                    <Box
                                        display={'inline-block'}
                                        sx={{
                                            marginTop: 2.5,
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
                                        <Link to={`/news/${news.slug}`}>
                                            {t('button.read_full_news')}
                                        </Link>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))}
            </Stack>
        </Box>
    )
}
