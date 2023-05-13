import { user } from '@/data'
import { theme } from '@/utils'
import ClearIcon from '@mui/icons-material/Clear'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import SearchIcon from '@mui/icons-material/Search'
import {
    Badge,
    Box,
    Button,
    Container,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    alpha,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { AccountMemu } from './components'

export function Header() {
    const [showClearIcon, setShowClearIcon] = useState<boolean>(false)
    const [searchVal, setSearchVal] = useState<string>('')

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        setSearchVal(value)
        setShowClearIcon(!!value)
    }

    const handleClearVal = () => {
        setShowClearIcon(false)
    }

    return (
        <Paper
            elevation={1}
            component="header"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                backgroundColor: theme.palette.primary.contrastText,
                borderRadius: 0,
                zIndex: 10,
            }}
        >
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: theme.spacing(0.5, 0),
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                width: 50,
                                height: 40,
                                a: {
                                    display: 'inline-block',
                                },
                            }}
                        >
                            <Link to={'/'}>
                                <img
                                    src={
                                        'https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png'
                                    }
                                    alt="logo"
                                />
                            </Link>
                        </Box>
                        <TextField
                            value={searchVal}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        style={{
                                            display: showClearIcon ? 'flex' : 'none',
                                        }}
                                        onClick={handleClearVal}
                                    >
                                        <ClearIcon />
                                    </InputAdornment>
                                ),
                            }}
                            size="small"
                            placeholder={'Search...'}
                            onChange={handleSearchChange}
                            sx={{
                                width: 400,
                            }}
                        />
                    </Box>
                    <Stack
                        direction={'row'}
                        sx={{
                            button: {
                                padding: 0,
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                borderRadius: theme.spacing(0.75),

                                '&:hover': {
                                    boxShadow: 'none',
                                    '& a': {
                                        textDecoration: 'underline',
                                    },
                                },

                                a: {
                                    display: 'inline-block',
                                    fontSize: '1rem',
                                    padding: theme.spacing(0.75, 1.75),
                                    fontWeight: 500,
                                },
                            },
                        }}
                    >
                        {false && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        a: {
                                            color: theme.palette.secondary.main,
                                        },
                                        '&:hover': {
                                            backgroundColor: '#3b49df1a',

                                            '& a': {
                                                color: theme.palette.primary.main,
                                            },
                                        },
                                    }}
                                >
                                    <Link to={'/login'}>Log in</Link>
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        marginBottom: 0.5,
                                        border: `2px solid ${theme.palette.primary.main}`,

                                        a: {
                                            color: theme.palette.primary.main,
                                        },

                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main,
                                            '& a': {
                                                color: theme.palette.primary.contrastText,
                                            },
                                        },
                                    }}
                                >
                                    <Link to={'/signup'}>Create account</Link>
                                </Button>
                            </Box>
                        )}

                        <Stack direction={'row'} gap={1.5} alignItems={'center'}>
                            <Button
                                variant="contained"
                                sx={{
                                    border: `1px solid ${theme.palette.primary.main}`,

                                    a: {
                                        color: theme.palette.primary.main,
                                    },

                                    '&:hover': {
                                        backgroundColor: theme.palette.primary.main,
                                        '& a': {
                                            color: theme.palette.primary.contrastText,
                                        },
                                    },
                                }}
                            >
                                <Link to={'/create-news'}>Create News</Link>
                            </Button>
                            <Box
                                padding={1}
                                sx={{
                                    borderRadius: theme.spacing(0.75),
                                    cursor: 'pointer',
                                    transition: '.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: alpha(
                                            theme.palette.primary.dark,
                                            0.1
                                        ),
                                        svg: {
                                            color: theme.palette.primary.dark,
                                        },
                                    },
                                }}
                            >
                                <Badge
                                    color="error"
                                    badgeContent={2}
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            border: `1px solid ${theme.palette.primary.contrastText}`,
                                        },
                                    }}
                                >
                                    <NotificationsNoneOutlinedIcon
                                        sx={{
                                            fontSize: '30px',
                                            color: theme.palette.secondary.light,
                                        }}
                                    />
                                </Badge>
                            </Box>
                            <AccountMemu
                                avatar={user.avatar as string}
                                username={user.username as string}
                                name={`${user.firstName} ${user.lastName}`}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </Paper>
    )
}
