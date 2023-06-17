import { IUser } from '@/models'
import { theme } from '@/utils'
import { Box, Typography, alpha } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export interface IUserFollowingProps {
    user: IUser
}

export function UserFollowing({ user }: IUserFollowingProps) {
    const { t } = useTranslation()
    const userFollowing = useMemo(() => {
        return user?.following?.length && user ? user.following : []
    }, [user])

    const linkUser = (u: IUser): string => {
        return u.id === user.id ? '/profile' : `/profile/${u.username}`
    }

    return (
        <Box>
            <Typography component="h3" variant="subtitle1" fontWeight={700}>
                {t('main_home.users_following')}
            </Typography>
            <Box component="ul" marginTop={0.5}>
                {userFollowing.map((u) => (
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
                                    textDecoration: 'underline',
                                },
                            },

                            a: {
                                display: 'block',
                            },
                        }}
                    >
                        <Link to={`${linkUser(u)}`}>@{u.username}</Link>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
