import { IUser } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, IconButton, Stack, Typography, alpha } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { enqueueSnackbar } from 'notistack'
import { userApi } from '@/api'
import { EmptyList } from '@/components/Common'

export interface IUserFollowingProps extends BoxProps {
    user: IUser | null
}

export function UserFollowing({ user, ...rest }: IUserFollowingProps) {
    const { t } = useTranslation()
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const userFollowing = useMemo(() => {
        const newUsers = [...users].sort(
            (a, b) => (b.numFollowers || 0) - (a.numFollowers || 0)
        )
        return user?.following?.length && user ? user.following || [] : newUsers
    }, [user, users])

    const linkUser = (u: IUser): string => {
        return user && u.id === user.id ? '/profile' : `/profile/${u.username}`
    }

    useEffect(() => {
        if (!user) {
            ;(async () => {
                try {
                    setLoading(true)
                    const res = await userApi.topUsers()
                    setUsers(res.data.users)
                } catch (error) {
                    enqueueSnackbar((error as Error).message, {
                        variant: 'error',
                    })
                }
                setLoading(false)
            })()
        }
    }, [])

    return (
        <Box {...rest}>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                {user && (
                    <>
                        <Typography component="h3" variant="subtitle1" fontWeight={700}>
                            {t('main_home.users_following')}
                        </Typography>
                        <Link to={'/dashboard/following'}>
                            <IconButton
                                sx={{
                                    padding: 0.5,
                                    '&:hover': {
                                        backgroundColor: alpha(
                                            theme.palette.primary.dark,
                                            0.1
                                        ),
                                        svg: {
                                            color: theme.palette.primary.dark,
                                        },
                                    },
                                }}
                            >
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </Link>
                    </>
                )}

                {/* not logged */}
                {!user && (
                    <Typography component="h3" variant="subtitle1" fontWeight={700}>
                        {t('main_home.users_top')}
                    </Typography>
                )}
            </Stack>
            <Box component="ul" marginTop={0.5}>
                {!loading && userFollowing.length === 0 && (
                    <EmptyList title={t('empty.no_user_following')} />
                )}
                {!loading &&
                    userFollowing.map((u) => (
                        <Box
                            component={'li'}
                            key={u.id}
                            sx={{
                                padding: theme.spacing(1, 2),
                                borderRadius: theme.spacing(0.75),
                                cursor: 'pointer',
                                color: alpha(theme.palette.secondary.main, 0.9),

                                '&:hover': {
                                    backgroundColor: '#3b49df1a',
                                    a: {
                                        color: theme.palette.primary.main,
                                        'span:first-of-type': {
                                            textDecoration: 'underline',
                                        },
                                    },
                                },

                                a: {
                                    display: 'block',
                                },
                            }}
                        >
                            <Link to={`${linkUser(u)}`}>
                                <Stack
                                    direction={'row'}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}
                                    sx={{
                                        span: {
                                            color: theme.palette.primary.main,
                                            fontWeight: 500,
                                        },
                                    }}
                                >
                                    <Typography component="span">
                                        @{u.username}
                                    </Typography>
                                    {!user && (
                                        <Typography
                                            component="span"
                                            sx={{
                                                padding: theme.spacing(0, 1),
                                                backgroundColor: '#3b49df1a',
                                                borderRadius: theme.spacing(0.75),
                                                fontSize: theme.typography.body2,
                                                fontWeight: 500,
                                                color: theme.palette.primary.dark,
                                            }}
                                        >
                                            {u.numFollowers}
                                        </Typography>
                                    )}
                                </Stack>
                            </Link>
                        </Box>
                    ))}
            </Box>
        </Box>
    )
}
