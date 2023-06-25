import { HashTagList } from '@/components/Common'
import { DEFAULT_LANGUAGES } from '@/consts'
import { useLinkUser } from '@/hooks'
import { INews, IUser } from '@/models'
import { AppState } from '@/store'
import { formatDate, shortDateFormat, theme } from '@/utils'
import {
    Avatar,
    Box,
    BoxProps,
    Divider,
    Paper,
    Stack,
    Typography,
    alpha,
} from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NewsAction, NewsComment, NewsContent } from '.'

export interface INewsDetailProps extends BoxProps {
    news: INews
    pUser: IUser | null
    pLanguages: string
}

function NewsDetail({ news, pUser, pLanguages, ...rest }: INewsDetailProps) {
    const { t } = useTranslation()
    const { user, title, hashTags, thumbnailImage, createdAt } = news

    const newTags = useMemo(() => {
        return hashTags?.length ? hashTags : []
    }, [news])

    const linkUser = useLinkUser(news.user as IUser)

    return (
        <Box
            {...rest}
            component={Paper}
            elevation={1}
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: theme.spacing(0.75),
                overflow: 'hidden',
            }}
        >
            <Box component="header" width={'100%'}>
                <Box
                    sx={{
                        width: '100%',
                        height: {
                            lg: 330,
                            sm: 200,
                            xs: 150,
                        },
                        img: {
                            width: '100%',
                            height: '100%',
                        },
                    }}
                >
                    <img src={thumbnailImage} alt={''} />
                </Box>

                <Box
                    sx={{
                        padding: {
                            lg: theme.spacing(4, 8, 0),
                            xs: theme.spacing(1.5, 1.5, 0),
                        },
                    }}
                >
                    <Box>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            marginBottom={{
                                md: 2.5,
                                xs: 2,
                            }}
                        >
                            <Box>
                                <Link to={linkUser}>
                                    <Avatar
                                        src={user?.avatar as string}
                                        alt={user?.username}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                        }}
                                    />
                                </Link>
                            </Box>
                            <Box paddingLeft={1}>
                                <Typography
                                    component="h6"
                                    variant="body1"
                                    sx={{
                                        a: {
                                            fontWeight: 700,
                                        },
                                    }}
                                >
                                    <Link to={linkUser}>{user?.username}</Link>
                                </Typography>

                                <Typography
                                    fontSize={'12px'}
                                    color={theme.palette.secondary.light}
                                >
                                    {t('dates.posted_on')}{' '}
                                    {pLanguages === DEFAULT_LANGUAGES
                                        ? shortDateFormat(createdAt || new Date())
                                        : formatDate(createdAt || new Date(), 'MMM DD')}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Box>
                        <Typography component="h1" variant="h3" marginBottom={1.5}>
                            {title}
                        </Typography>
                        <HashTagList tags={newTags} fontText={theme.typography.body1} />
                    </Box>
                </Box>
            </Box>

            <NewsContent content={news.content} />
            <NewsAction news={news} />

            <Divider
                sx={{
                    borderColor: alpha(theme.palette.secondary.dark, 0.1),
                }}
            />

            <Box
                padding={{
                    lg: theme.spacing(4, 8),
                    xs: theme.spacing(2, 1.5),
                }}
            >
                {/* COMMENT */}
                {!pUser && (
                    <Typography
                        sx={{
                            padding: 3,
                            a: {
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            },
                            marginBottom: 2,
                            backgroundColor: alpha(theme.palette.primary.dark, 0.075),
                            borderRadius: theme.spacing(0.75),
                            boxShadow: `0 0 1px ${theme.palette.primary.dark}`,
                        }}
                    >
                        {t('message.please')} <Link to={'/login'}>{t('auth.login')}</Link>{' '}
                        {t('message.to_comment_news')}
                    </Typography>
                )}
                <NewsComment news={news} />
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pLanguages: state.common.languages,
    }
}

export default connect(mapStateToProps, null)(NewsDetail)
