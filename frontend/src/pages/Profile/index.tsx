import { IUser } from '@/models'
import { ProfileInfoItem, ProfileLeftItem, ProfileNews } from '@/pages/Profile/components'
import { AppState } from '@/store'
import { formatDate, theme } from '@/utils'
import ArticleIcon from '@mui/icons-material/Article'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import TagIcon from '@mui/icons-material/Tag'
import { Avatar, Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export interface IProfileProps {
    pUser: IUser | null
}

function Profile({ pUser }: IProfileProps) {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = `${pUser?.username} - DEV Community`
    })

    // TODO: GET PROFILE HERE

    const newNews = useMemo(() => {
        return pUser?.news?.length ? pUser.news : []
    }, [pUser])

    return (
        pUser && (
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
                                    src={pUser.avatar}
                                    alt={pUser.username}
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
                                {pUser.username}
                            </Typography>
                            {pUser.bio && (
                                <Typography
                                    fontSize={'18px'}
                                    sx={{
                                        width: '100%',
                                        maxWidth: '80%',
                                        margin: 'auto',
                                        marginBottom: 2,
                                    }}
                                >
                                    {pUser.bio}
                                </Typography>
                            )}
                            <Typography
                                sx={{
                                    fontSize: theme.typography.body2,
                                }}
                            >
                                Joined on{' '}
                                {formatDate(
                                    pUser.dateJoined || new Date(),
                                    'MMM DD, YYYY'
                                )}
                            </Typography>
                        </Box>
                        {pUser.work && (
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
                                        <Typography>{pUser.work}</Typography>
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
                            {pUser.skillLanguages && (
                                <ProfileLeftItem
                                    title={'Skills/Languages'}
                                    value={pUser.skillLanguages}
                                />
                            )}

                            {pUser.currentlyLearning && (
                                <ProfileLeftItem
                                    title={'Currently Learning'}
                                    value={pUser.currentlyLearning}
                                />
                            )}

                            <Box component={Paper} elevation={1} padding={2}>
                                <ProfileInfoItem
                                    icon={ArticleIcon}
                                    text={`${pUser.newsCount || 0} news`}
                                    marginBottom={2}
                                />
                                <ProfileInfoItem
                                    icon={ChatBubbleOutlineIcon}
                                    text={`${
                                        pUser.comments?.length || 0
                                    } comment written`}
                                    marginBottom={2}
                                />
                                <ProfileInfoItem
                                    icon={TagIcon}
                                    text={`${pUser.hashTags?.length || 0} tags followed`}
                                />
                            </Box>
                        </Stack>
                        <Box>
                            <ProfileNews news={newNews} />
                        </Box>
                    </Box>
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

export default connect(mapStateToProps, null)(Profile)
