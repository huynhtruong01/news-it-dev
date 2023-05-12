import { formatDate } from '@/utils'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export interface IUserNewsInfoProps {
    avatar: string
    username: string
    createdAtNews: Date
    link: string
}

export function UserNewsInfo({
    avatar,
    username,
    createdAtNews,
    link,
}: IUserNewsInfoProps) {
    return (
        <Stack direction={'row'} gap={1} alignItems={'flexStart'} marginBottom={2}>
            <Box>
                <Link to={link}>
                    <Avatar
                        src={avatar}
                        alt={username}
                        sx={{
                            width: 32,
                            height: 32,
                        }}
                    />
                </Link>
            </Box>
            <Box>
                <Typography
                    component="h6"
                    variant="body2"
                    sx={{
                        lineHeight: 1,
                        a: {
                            fontWeight: 500,
                        },
                    }}
                >
                    <Link to={link}>{username}</Link>
                </Typography>

                <Box component="time" fontSize={'12px'}>
                    <Link to={link}>{formatDate(createdAtNews, 'MMM DD')}</Link>
                </Box>
            </Box>
        </Stack>
    )
}
