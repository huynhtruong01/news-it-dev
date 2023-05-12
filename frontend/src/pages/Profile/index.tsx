import { Box, Avatar, Button, Typography, Paper, Divider, Stack } from '@mui/material'
import { theme, formatDate } from '@/utils'
import { user } from '@/data'
import ArticleIcon from '@mui/icons-material/Article'
import { ProfileInfoItem, ProfileNews } from '@/pages/Profile/components'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import TagIcon from '@mui/icons-material/Tag'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function Profile() {
    const navigate = useNavigate()
    const {
        avatar,
        username,
        bio,
        dateJoined,
        work,
        skillLanguages,
        newsCount,
        comments,
        hashTags,
        news,
    } = user

    useEffect(() => {
        document.title = `${username} - DEV Community`
    })

    // TODO: FETCH PROFILE USER HERE

    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    height: 150,
                    backgroundColor: theme.palette.primary.dark,
                    borderRadius: theme.spacing(0.75),
                }}
            ></Box>

            <Stack
                component="header"
                gap={2}
                sx={{
                    width: '100%',
                    maxWidth: '1024px',
                    margin: 'auto',
                    marginTop: '-4rem',
                }}
            >
                <Box component={Paper} elevation={1}>
                    <Box
                        sx={{
                            position: 'relative',
                            paddingTop: 2,
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '-64px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                        >
                            <Avatar
                                src={avatar}
                                alt={username}
                                sx={{
                                    width: 128,
                                    height: 128,
                                    border: `10px solid ${theme.palette.primary.dark}`,
                                }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            sx={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                borderRadius: theme.spacing(0.75),
                                padding: theme.spacing(1, 2),
                                backgroundColor: theme.palette.primary.light,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                            onClick={() => navigate('/settings')}
                        >
                            Edit profile
                        </Button>
                    </Box>
                    <Box padding={theme.spacing(8, 3, 3)} textAlign="center">
                        <Typography
                            component="h1"
                            variant="h4"
                            fontWeight={700}
                            marginBottom={1}
                        >
                            {username}
                        </Typography>
                        {bio && (
                            <Typography
                                fontSize={'18px'}
                                sx={{
                                    marginBottom: 2,
                                }}
                            >
                                {bio}
                            </Typography>
                        )}
                        <Typography
                            sx={{
                                fontSize: theme.typography.body2,
                            }}
                        >
                            Joined on{' '}
                            {formatDate(dateJoined || new Date(), 'MMM DD, YYYY')}
                        </Typography>
                    </Box>
                    {work && (
                        <>
                            <Divider />
                            <Box padding={1.5} textAlign="center">
                                <Box padding={1.5}>
                                    <Box
                                        component="strong"
                                        sx={{
                                            fontSize: theme.typography.body2,
                                            fontWeight: 700,
                                        }}
                                    >
                                        Work
                                    </Box>
                                    <Typography>{work}</Typography>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 2fr',
                        gap: 2,
                    }}
                >
                    <Stack gap={2}>
                        {skillLanguages && (
                            <Box component={Paper} elevation={1}>
                                <Typography
                                    component="h3"
                                    variant="body1"
                                    padding={theme.spacing(1.5, 2)}
                                    fontWeight={700}
                                >
                                    Skills/Languages
                                </Typography>
                                <Typography padding={theme.spacing(2)}>
                                    {skillLanguages}
                                </Typography>
                            </Box>
                        )}

                        <Box component={Paper} elevation={1} padding={2}>
                            <ProfileInfoItem
                                icon={ArticleIcon}
                                text={`${newsCount || 0} news`}
                                marginBottom={2}
                            />
                            <ProfileInfoItem
                                icon={ChatBubbleOutlineIcon}
                                text={`${comments?.length || 0} comment written`}
                                marginBottom={2}
                            />
                            <ProfileInfoItem
                                icon={TagIcon}
                                text={`${hashTags?.length || 0} tags followed`}
                            />
                        </Box>
                    </Stack>
                    <Box>{news?.length && <ProfileNews news={news} />}</Box>
                </Box>
            </Stack>
        </Box>
    )
}
