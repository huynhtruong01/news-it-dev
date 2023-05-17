import { IUser } from '@/models'
import { formatDate, theme } from '@/utils'
import { Avatar, Box, Stack, Typography, alpha } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserDetailHover } from '.'

export interface IUserNewsInfoProps {
    user: IUser
    link: string
}

export function UserNewsInfo({ user, link }: IUserNewsInfoProps) {
    const [open, setOpen] = useState<boolean>(false)

    const handleHoverUser = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Stack direction={'row'} gap={0.5} alignItems={'flexStart'} marginBottom={2}>
            <Box>
                <Link to={link}>
                    <Avatar
                        src={user.avatar}
                        alt={user?.username}
                        sx={{
                            width: 32,
                            height: 32,
                        }}
                    />
                </Link>
            </Box>
            <Box>
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    component="h6"
                    variant="body2"
                    onMouseEnter={handleHoverUser}
                    onMouseLeave={handleClose}
                    sx={{
                        position: 'relative',
                        lineHeight: 1,
                        cursor: 'pointer',

                        a: {
                            fontWeight: 500,
                            padding: theme.spacing(0.75, 0.5),
                            borderRadius: theme.spacing(0.25),
                            transition: '.2s ease-in-out',

                            '&:hover': {
                                backgroundColor: alpha(
                                    theme.palette.secondary.dark,
                                    0.05
                                ),
                            },
                        },
                    }}
                >
                    <Link to={link}>{user?.username}</Link>

                    {open && (
                        <UserDetailHover
                            user={user as IUser}
                            sx={{
                                position: 'absolute',
                                top: 23,
                                left: 0,
                                width: 400,
                                padding: 2,
                                paddingTop: 0,
                                zIndex: 10,
                            }}
                        />
                    )}
                </Typography>

                <Box
                    component="time"
                    fontSize={'12px'}
                    color={alpha(theme.palette.secondary.dark, 0.7)}
                    padding={theme.spacing(0, 0.5)}
                >
                    <Link to={link}>
                        {formatDate(user?.createdAt || new Date(), 'MMM DD')}
                    </Link>
                </Box>
            </Box>
        </Stack>
    )
}
