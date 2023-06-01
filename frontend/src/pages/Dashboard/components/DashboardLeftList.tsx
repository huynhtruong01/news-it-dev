import { IUser } from '@/models'
import { theme } from '@/utils'
import { Box, Stack, Typography, alpha } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export interface IDashboardLeftListProps {
    user: IUser
}

export function DashboardLeftList({ user }: IDashboardLeftListProps) {
    const { t } = useTranslation()
    const [activeLink, setActiveLink] = useState<string>('')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const link = location.pathname.split('/')[2]
        setActiveLink(link ? link : '')
    }, [navigate])

    return (
        <Box component="nav">
            <Stack
                gap={1}
                component="ul"
                sx={{
                    li: {
                        a: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: theme.spacing(1),
                            gap: 1,
                            borderRadius: theme.spacing(0.75),
                            color: theme.palette.grey[700],

                            'span:nth-of-type(2)': {
                                padding: 0.5,
                                borderRadius: theme.spacing(0.75),
                                backgroundColor: theme.palette.grey[400],
                                fontSize: theme.typography.body2,
                                lineHeight: 1,
                                color: theme.palette.secondary.dark,
                            },
                        },
                    },
                }}
            >
                <Box
                    component="li"
                    sx={{
                        a: {
                            fontWeight: activeLink === '' ? 500 : 400,
                            backgroundColor:
                                activeLink === ''
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',

                            '&:hover': {
                                backgroundColor:
                                    activeLink === ''
                                        ? theme.palette.primary.contrastText
                                        : alpha(theme.palette.primary.light, 0.2),
                                color:
                                    activeLink === ''
                                        ? '#000'
                                        : theme.palette.primary.dark,
                            },
                        },
                    }}
                >
                    <Link to={'/dashboard'}>
                        <Typography component="span">{t('dashboard.news')}</Typography>
                        <Typography component="span">{user.newsCount || 0}</Typography>
                    </Link>
                </Box>
                <Box
                    component="li"
                    sx={{
                        a: {
                            fontWeight: activeLink === 'followers' ? 500 : 400,
                            backgroundColor:
                                activeLink === 'followers'
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',

                            '&:hover': {
                                backgroundColor:
                                    activeLink === 'followers'
                                        ? theme.palette.primary.contrastText
                                        : alpha(theme.palette.primary.light, 0.2),
                                color:
                                    activeLink === 'followers'
                                        ? '#000'
                                        : theme.palette.primary.dark,
                            },
                        },
                    }}
                >
                    <Link to={'/dashboard/followers'}>
                        <Typography component="span">
                            {t('dashboard.followers')}
                        </Typography>
                        <Typography component="span">
                            {user.followers?.length || 0}
                        </Typography>
                    </Link>
                </Box>
                <Box
                    component="li"
                    sx={{
                        a: {
                            fontWeight: activeLink === 'following' ? 500 : 400,
                            backgroundColor:
                                activeLink === 'following'
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',

                            '&:hover': {
                                backgroundColor:
                                    activeLink === 'following'
                                        ? theme.palette.primary.contrastText
                                        : alpha(theme.palette.primary.light, 0.2),
                                color:
                                    activeLink === 'following'
                                        ? '#000'
                                        : theme.palette.primary.dark,
                            },
                        },
                    }}
                >
                    <Link to={'/dashboard/following'}>
                        <Typography component="span">
                            {t('dashboard.following_user')}
                        </Typography>
                        <Typography component="span">
                            {user.following?.length || 0}
                        </Typography>
                    </Link>
                </Box>
                <Box
                    component="li"
                    sx={{
                        a: {
                            fontWeight: activeLink === 'tags' ? 500 : 400,
                            backgroundColor:
                                activeLink === 'tags'
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',

                            '&:hover': {
                                backgroundColor:
                                    activeLink === 'tags'
                                        ? theme.palette.primary.contrastText
                                        : alpha(theme.palette.primary.light, 0.2),
                                color:
                                    activeLink === 'tags'
                                        ? '#000'
                                        : theme.palette.primary.dark,
                            },
                        },
                    }}
                >
                    <Link to={'/dashboard/tags'}>
                        <Typography component="span">
                            {t('dashboard.following_tags')}
                        </Typography>
                        <Typography component="span">
                            {user.hashTags?.length || 0}
                        </Typography>
                    </Link>
                </Box>
                <Box
                    component="li"
                    sx={{
                        a: {
                            fontWeight: activeLink === 'likes' ? 500 : 400,
                            backgroundColor:
                                activeLink === 'likes'
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',

                            '&:hover': {
                                backgroundColor:
                                    activeLink === 'likes'
                                        ? theme.palette.primary.contrastText
                                        : alpha(theme.palette.primary.light, 0.2),
                                color:
                                    activeLink === 'likes'
                                        ? '#000'
                                        : theme.palette.primary.dark,
                            },
                        },
                    }}
                >
                    <Link to={'/dashboard/likes'}>
                        <Typography component="span">
                            {t('dashboard.news_likes')}
                        </Typography>
                        <Typography component="span">
                            {user.newsLikes?.length || 0}
                        </Typography>
                    </Link>
                </Box>
                <Box
                    component="li"
                    sx={{
                        a: {
                            fontWeight: activeLink === 'reading-list' ? 500 : 400,
                            backgroundColor:
                                activeLink === 'reading-list'
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',

                            '&:hover': {
                                backgroundColor:
                                    activeLink === 'reading-list'
                                        ? theme.palette.primary.contrastText
                                        : alpha(theme.palette.primary.light, 0.2),
                                color:
                                    activeLink === 'reading-list'
                                        ? '#000'
                                        : theme.palette.primary.dark,
                            },
                        },
                    }}
                >
                    <Link to={'/dashboard/reading-list'}>
                        <Typography component="span">
                            {t('dashboard.reading_list')}
                        </Typography>
                        <Typography component="span">
                            {user.saves?.length || 0}
                        </Typography>
                    </Link>
                </Box>
            </Stack>
        </Box>
    )
}
