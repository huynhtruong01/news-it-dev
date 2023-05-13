import { theme } from '@/utils'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import {
    Avatar,
    Box,
    BoxProps,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
    alpha,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleIcon from '@mui/icons-material/Article'

export interface IAccountMemuProps extends BoxProps {
    avatar: string
    username: string
    name: string
}

export function AccountMemu({ avatar, username, name }: IAccountMemuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleOpenClick = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseClick = () => {
        setAnchorEl(null)
    }

    return (
        <Box>
            <Tooltip title={username}>
                <IconButton
                    onClick={handleOpenClick}
                    size="small"
                    sx={{ borderRadius: '50% !important' }}
                >
                    <Avatar
                        src={avatar}
                        sx={{
                            width: 44,
                            height: 44,
                            border: '0.25rem solid transparent',
                            '&:hover': {
                                borderColor: theme.palette.grey[200],
                            },
                        }}
                        alt={username}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseClick}
                onClick={handleCloseClick}
                disablePortal
                PaperProps={{
                    elevation: 1,
                    sx: {
                        borderRadius: theme.spacing(0.75),
                        overflow: 'visible',
                        mt: 0.5,
                        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
                        width: 250,
                        padding: 1,
                        ul: {
                            padding: 0,
                        },
                        li: {
                            borderRadius: theme.spacing(0.75),
                            padding: theme.spacing(1, 2),
                            a: {
                                display: 'block',
                                width: '100%',
                            },
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.dark, 0.15),
                                color: theme.palette.primary.dark,
                                svg: {
                                    color: theme.palette.primary.dark,
                                },
                                span: {
                                    textDecoration: 'underline',
                                },
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                disableScrollLock={true}
            >
                <MenuItem>
                    {/* TODO: WRITE LINK HERE */}
                    <Link to={'/profile'}>
                        <Stack alignItems={'flex-start'}>
                            <Typography component="span" fontWeight={500}>
                                {name}
                            </Typography>
                            <Typography component="small" fontSize={'14px'}>
                                @{username}
                            </Typography>
                        </Stack>
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Link to={'/dashboard'}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon>
                                <DashboardIcon fontSize="small" />
                            </ListItemIcon>
                            <span>Dashboard</span>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to={'/reading-list'}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon>
                                <ArticleIcon fontSize="small" />
                            </ListItemIcon>
                            <span>Reading list</span>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to={'/settings'}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <span>Settings</span>
                        </Stack>
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
}
