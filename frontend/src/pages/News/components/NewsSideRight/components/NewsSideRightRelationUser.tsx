import { HashTagList } from '@/components/Common'
import { Status } from '@/enums'
import { INews, IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import { Box, BoxProps, Paper, Stack, Typography, alpha } from '@mui/material'
import { TFunction } from 'i18next'
import { useMemo } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface INewsSideRightRelationUserProps extends BoxProps {
    news: INews
    user: IUser | null
    pUser: IUser | null
    t: TFunction<'translation', undefined, 'translation'>
}

function NewsSideRightRelationUser({
    news,
    user,
    t,
    pUser,
    ...rest
}: INewsSideRightRelationUserProps) {
    const newsList = useMemo(() => {
        if (user && Array.isArray(user?.news)) {
            const newNewsList = [...(user?.news || [])].sort(
                (a, b) =>
                    new Date(b.createdAt as Date).getTime() -
                    new Date(a.createdAt as Date).getTime()
            )

            return newNewsList
                .filter((n) => n.id !== news.id)
                .filter((n) => n.status === Status.PUBLIC)
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
                overflow={'hidden'}
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
                    {t('news.more_from')} <Link to={link}>{user.username}</Link>
                </Typography>

                <Stack component="ul">
                    {newsList.map((newsItem) => (
                        <Box
                            key={newsItem.id}
                            component="li"
                            sx={{
                                '&:not(last-of-type)': {
                                    borderBottom: `1px solid ${alpha(
                                        theme.palette.secondary.main,
                                        0.05
                                    )}`,
                                },

                                '&:first-of-type': {
                                    borderTop: `1px solid ${alpha(
                                        theme.palette.secondary.main,
                                        0.05
                                    )}`,
                                },

                                '& > a': {
                                    display: 'block',
                                    padding: 2,
                                },

                                '&:hover': {
                                    backgroundColor: theme.palette.grey['A100'],

                                    h6: {
                                        color: theme.palette.primary.main,
                                        textDecoration: 'underline',
                                    },
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
