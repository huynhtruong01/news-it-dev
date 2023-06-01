import { theme } from '@/utils'
import { Box, Paper, Stack, Typography, alpha } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export interface IProfileUserNumFollowProps {
    numFollowed: number
    numFollowing: number
    linkFollowed?: string
    linkFollowing?: string
}

export function ProfileUserNumFollow({
    numFollowed,
    numFollowing,
    linkFollowed,
    linkFollowing,
}: IProfileUserNumFollowProps) {
    const { t } = useTranslation()

    return (
        <Box component={Paper} elevation={1} padding={2}>
            <Box
                sx={{
                    div: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: alpha(theme.palette.secondary.dark, 0.8),
                    },
                    svg: {
                        fontSize: theme.typography.h5,
                        color: alpha(theme.palette.secondary.dark, 0.6),
                    },
                    a: {
                        '&:hover': {
                            '& p': {
                                color: theme.palette.primary.main,
                            },
                            svg: {
                                color: theme.palette.primary.main,
                            },
                        },
                    },
                }}
            >
                {!linkFollowed && (
                    <>
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            gap={1.5}
                            marginBottom={2}
                        >
                            <Typography>
                                <AiOutlineUser />
                            </Typography>
                            <Typography>
                                {numFollowed} {t('common.followed')}
                            </Typography>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                            <Typography>
                                <AiOutlineUser />
                            </Typography>
                            <Typography>
                                {numFollowing} {t('common.following')}
                            </Typography>
                        </Stack>
                    </>
                )}
                {!!linkFollowed && !!linkFollowing && (
                    <>
                        <Link to={linkFollowed as string}>
                            <Stack
                                direction={'row'}
                                alignItems={'center'}
                                gap={1.5}
                                marginBottom={2}
                            >
                                <Typography>
                                    <AiOutlineUser />
                                </Typography>
                                <Typography>
                                    {numFollowed} {t('common.followed')}
                                </Typography>
                            </Stack>
                        </Link>
                        <Link to={linkFollowing}>
                            <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                                <Typography>
                                    <AiOutlineUser />
                                </Typography>
                                <Typography>
                                    {numFollowing} {t('common.following')}
                                </Typography>
                            </Stack>
                        </Link>
                    </>
                )}
            </Box>
        </Box>
    )
}
