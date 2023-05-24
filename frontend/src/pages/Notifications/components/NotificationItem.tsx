import { HashTagList } from '@/components/Common'
import { useLinkUser } from '@/hooks'
import { IHashTag, INotify, IUser } from '@/models'
import { theme } from '@/utils'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { Avatar, Box, Button, Paper, Stack, Typography, alpha } from '@mui/material'
import moment from 'moment'
import { Link } from 'react-router-dom'

export interface INotificationItemProps {
    notify: INotify
}

export function NotificationItem({ notify }: INotificationItemProps) {
    const linkUser = useLinkUser(notify.user as IUser)

    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                padding: 3,
            }}
        >
            <Stack direction={'row'} alignItems={'center'} gap={1} marginBottom={2}>
                <Avatar src={notify.user?.avatar} alt={notify.user?.username} />
                <Box>
                    <Typography
                        variant="body1"
                        sx={{
                            a: {
                                fontWeight: 600,
                            },
                        }}
                    >
                        <Link to={linkUser}>{notify.user?.username}</Link> add new news
                    </Typography>
                    <Box
                        component="time"
                        sx={{
                            fontSize: theme.typography.caption,
                            color: alpha(theme.palette.secondary.main, 0.65),
                        }}
                    >
                        {moment(notify.news?.createdAt || new Date()).fromNow()}
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
                    <Link to={`/news/${notify.news?.slug}`}>{notify.news?.title}</Link>
                </Typography>
                <HashTagList tags={notify.news?.hashTags as IHashTag[]} />
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
