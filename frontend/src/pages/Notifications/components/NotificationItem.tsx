import { HashTagList } from '@/components/Common'
import { AVATAR, tagList } from '@/data'
import { Avatar, Box, Typography, Button, Paper, Stack, alpha } from '@mui/material'
import { Link } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import moment from 'moment'
import { theme } from '@/utils'

// export interface INotificationItemProps {}

export function NotificationItem() {
    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                padding: 3,
            }}
        >
            <Stack direction={'row'} alignItems={'center'} gap={1} marginBottom={2}>
                <Avatar src={AVATAR} alt="" />
                <Box>
                    <Typography
                        variant="body1"
                        sx={{
                            a: {
                                fontWeight: 600,
                            },
                        }}
                    >
                        <Link to={'/'}>Huynh Truong</Link> add new news
                    </Typography>
                    <Box
                        component="time"
                        sx={{
                            fontSize: theme.typography.body2,
                            color: alpha(theme.palette.secondary.main, 0.65),
                        }}
                    >
                        {moment([2018, 0, 29]).fromNow()}
                    </Box>
                </Box>
            </Stack>

            <Box paddingLeft={6}>
                <Typography
                    component="h2"
                    variant="h5"
                    fontWeight={700}
                    sx={{
                        marginBottom: 1.5,
                        a: {
                            '&:hover': {
                                color: theme.palette.primary.main,
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    <Link to={'/'}>
                        Tailwind CSS for Beginners: Build a Social Link Project
                    </Link>
                </Typography>
                <HashTagList tags={tagList} />
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    marginTop={3}
                    sx={{
                        button: {
                            fontSize: theme.typography.body2,
                            padding: theme.spacing(0.85, 2),
                            color: theme.palette.secondary.main,
                            backgroundColor: alpha(theme.palette.secondary.main, 0.075),
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            },
                        },
                    }}
                >
                    <Button variant="contained" startIcon={<FavoriteBorderIcon />}>
                        Like
                    </Button>
                    <Button variant="contained" endIcon={<BookmarkBorderIcon />}>
                        Save
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}
