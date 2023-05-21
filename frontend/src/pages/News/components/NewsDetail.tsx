import { HashTagList } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import { INews, IUser } from '@/models'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, BoxProps, Paper, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { NewsComment } from '.'
import { connect } from 'react-redux'
import { AppState } from '@/store'

export interface INewsDetailProps extends BoxProps {
    pUser: IUser | null
    news: INews
}

function NewsDetail({ pUser, news, ...rest }: INewsDetailProps) {
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
                height: '100%',
                borderRadius: theme.spacing(0.75),
                overflow: 'hidden',
            }}
        >
            <Box component="header" width={'100%'}>
                <Box maxHeight={420} width={'100%'}>
                    <img src={thumbnailImage} alt={''} />
                </Box>

                <Box
                    sx={{
                        padding: theme.spacing(4, 8, 0),
                    }}
                >
                    <Box>
                        <Stack direction={'row'} alignItems={'center'} marginBottom={2.5}>
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
                            <Box paddingLeft={theme.spacing(1.5)}>
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
                                    Posted on{' '}
                                    {formatDate(createdAt || new Date(), 'MMM DD')}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    <Box>
                        <Typography
                            component="h1"
                            variant="h3"
                            fontWeight={700}
                            marginBottom={1}
                        >
                            {title}
                        </Typography>
                        <HashTagList tags={newTags} fontText={theme.typography.body1} />
                    </Box>
                </Box>
            </Box>

            <Box component="article" padding={theme.spacing(4, 8)}>
                <Box
                    sx={{
                        p: {
                            lineHeight: '30px !important',
                            fontSize: '20px',
                            margin: theme.spacing(0, 0, 2.5, 0),
                            color: '#171717',
                            overflowWrap: 'break-word',
                        },
                        span: {
                            lineHeight: '30px !important',
                        },
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </Box>

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
