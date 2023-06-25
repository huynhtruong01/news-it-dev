import { userApi } from '@/api'
import { SkeletonText } from '@/components/Common'
import { IUser } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Typography, alpha } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export type IUserSuggestionProps = BoxProps

export function UserSuggestion({ ...rest }) {
    const { t } = useTranslation()
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const res = await userApi.suggestionUsers()
                setUsers(res.data.users)
            } catch (error) {
                enqueueSnackbar((error as Error).message, {
                    variant: 'error',
                })
            }
            setLoading(false)
        })()
    }, [])

    return (
        <Box {...rest}>
            <Typography component="h3" variant="subtitle1" fontWeight={700}>
                {t('main_home.users_suggestion')}
            </Typography>
            <Box>{loading && <SkeletonText />}</Box>
            <Box component="ul" marginTop={0.5}>
                {!loading &&
                    users.map((u) => (
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
                                    color: theme.palette.primary.main,
                                    fontWeight: 500,
                                },
                            }}
                        >
                            <Link to={`/profile/${u.username}`}>@{u.username}</Link>
                        </Box>
                    ))}
            </Box>
        </Box>
    )
}
