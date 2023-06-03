import { HashTagList } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import { INews, IUser } from '@/models'
import { AppState } from '@/store'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, BoxProps, Divider, Paper, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NewsComment } from '.'

export interface INewsDetailProps extends BoxProps {
    pUser: IUser | null
    news: INews
}

function NewsDetail({ pUser, news, ...rest }: INewsDetailProps) {
    const { t } = useTranslation()
    const { user, title, content, hashTags, thumbnailImage, createdAt } = news

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
                                        src={user?.avatar}
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
                                    {formatDate(createdAt || new Date(), 'MMM DD')}
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

            <Box
                component="article"
                padding={{
                    lg: theme.spacing(4, 8),
                    xs: theme.spacing(0, 1.5, 2),
                }}
            >
                <Box
                    sx={{
                        '& > p': {
                            letterSpacing: '0.5px',
                            lineHeight: '30px !important',
                            fontSize: {
                                md: '20px',
                                sm: '18px',
                                xs: '1rem',
                            },
                            color: '#171717',
                            overflowWrap: 'break-word',
                            margin: {
                                lg: theme.spacing(0, 0, 2.5, 0),
                                md: theme.spacing(0, 0, 1, 0),
                                xs: 0,
                            },
                        },
                        span: {
                            lineHeight: '30px !important',
                        },
                        img: {
                            width: 'auto',
                            height: 'auto',
                            borderRadius: theme.spacing(0.75),
                            margin: 'auto',
                        },
                        'h1,h2,h3,h4,h5,h6': {
                            margin: {
                                md: theme.spacing(1.25, 0),
                                xs: theme.spacing(1, 0),
                            },
                        },
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </Box>

            <Divider />

            {/* COMMENT */}
            {pUser && <NewsComment newsId={news.id} />}
            {!pUser && (
                <Typography
                    sx={{
                        padding: theme.spacing(2, 8, 8),
                        a: {
                            color: theme.palette.primary.main,
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    Please <Link to={'/login'}>login</Link> to comment this news.
                </Typography>
            )}
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(NewsDetail)
