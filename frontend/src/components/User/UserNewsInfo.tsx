import { IUser } from '@/models'
import { formatDate, shortDateFormat, theme } from '@/utils'
import { Avatar, Box, Stack, Typography, alpha } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserDetailHover } from '.'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { DEFAULT_LANGUAGES } from '@/consts'

export interface IUserNewsInfoProps {
    user: IUser
    link: string
    pLanguages: string
}

export function UserNewsInfo({ user, link, pLanguages }: IUserNewsInfoProps) {
    const [open, setOpen] = useState<boolean>(false)

    const handleHoverUser = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Stack
            direction={'row'}
            gap={0.5}
            alignItems={'flexStart'}
            marginBottom={{
                md: 2,
                xs: 1,
            }}
            position={'relative'}
        >
            <Box>
                <Link to={link}>
                    <Avatar
                        src={user.avatar as string}
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
                        lineHeight: 1,
                        cursor: 'pointer',

                        a: {
                            fontWeight: 600,
                            padding: theme.spacing(0.75, 0.5, 1),
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
                                display: {
                                    lg: 'block',
                                    md: 'none',
                                },
                                position: 'absolute',
                                top: 15,
                                left: 40,
                                maxWidth: 350,
                                width: '100%',
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
                        {pLanguages === DEFAULT_LANGUAGES
                            ? shortDateFormat(user?.createdAt || new Date())
                            : formatDate(user?.createdAt || new Date(), 'MMM DD')}
                    </Link>
                </Box>
            </Box>
        </Stack>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pLanguages: state.common.languages,
    }
}

export default connect(mapStateToProps, null)(UserNewsInfo)
