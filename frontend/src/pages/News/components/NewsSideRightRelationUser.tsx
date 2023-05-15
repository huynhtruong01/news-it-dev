import { HashTagList } from '@/components/Common'
import { INews, IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import { Box, BoxProps, Paper, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface INewsSideRightRelationUserProps extends BoxProps {
    news: INews
    user: IUser | null
    pUser: IUser | null
}

function NewsSideRightRelationUser({
    news,
    user,
    pUser,
    ...rest
}: INewsSideRightRelationUserProps) {
    const newsList = useMemo(() => {
        if (user?.news?.length) {
            return user?.news
                ?.sort((a, b) => {
                    return (
                        new Date(b.createdAt as Date).getTime() -
                        new Date(a.createdAt as Date).getTime()
                    )
                })
                .filter((n) => n.id !== news.id)
                .slice(0, 3)
        }
        return []
    }, [user])

    const link = useMemo(() => {
        return user?.id === pUser?.id ? '/profile' : `/profile/${user?.username}`
    }, [user, pUser])

    return (
        user && (
            <Box
                {...rest}
                component={Paper}
                elevation={1}
                borderRadius={theme.spacing(0.75)}
            >
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
                    More from <Link to={link}>{user.username}</Link>
                </Typography>

                <Stack component="ul" gap={2}>
                    {newsList.map((newsItem) => (
                        <Box
                            key={newsItem.id}
                            component="li"
                            padding={theme.spacing(1.5, 2, 2)}
                            sx={{
                                '&:hover h6': {
                                    color: theme.palette.primary.main,
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            <Link to={`/news/${newsItem.slug}`}>
                                <Typography
                                    component="h6"
                                    variant="body1"
                                    color={theme.palette.secondary.light}
                                >
                                    {newsItem.title}
                                </Typography>
                                <Box paddingTop={1.5}>
                                    <HashTagList
                                        tags={newsItem.hashTags || []}
                                        sx={{
                                            marginBottom: 0,
                                        }}
                                    />
                                </Box>
                            </Link>
                        </Box>
                    ))}
                </Stack>
            </Box>
        )
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(NewsSideRightRelationUser)
