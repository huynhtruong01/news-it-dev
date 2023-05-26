import { initNewsFormValues } from '@/data'
import { INewsForm, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setInitValueForm } from '@/store/news'
import { theme } from '@/utils'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import SearchIcon from '@mui/icons-material/Search'
import {
    Badge,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    alpha,
} from '@mui/material'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AccountMemu } from './components'

export interface IHeaderProps {
    pUser: IUser | null
    pSetInitValuesNewsForm: (values: INewsForm) => void
    pNumNotifications: number
}

function Header({ pUser, pSetInitValuesNewsForm, pNumNotifications }: IHeaderProps) {
    const [searchVal, setSearchVal] = useState<string>('')
    const searchRef = useRef<HTMLInputElement | null>(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.pathname.startsWith('/search')) setSearchVal('')
    }, [navigate])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchVal(value)
    }

    const handleSearchNews = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(`/search?q=${encodeURIComponent(searchVal)}`)
        if (searchRef.current) searchRef.current.blur()
    }

    const handleSetInitValuesForm = () => {
        pSetInitValuesNewsForm(initNewsFormValues)
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
                        padding: theme.spacing(0.75, 0),
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
                        <Box component="form" onSubmit={handleSearchNews}>
                            <TextField
                                inputRef={searchRef}
                                value={searchVal}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{
                                                marginRight: 0,
                                            }}
                                        >
                                            <IconButton type="submit">
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                size="small"
                                placeholder={'Search...'}
                                onChange={handleSearchChange}
                                sx={{
                                    width: 400,
                                    '.MuiInputBase-root': {
                                        paddingRight: 0,
                                    },
                                    fieldset: {
                                        paddingRight: 0,
                                    },
                                }}
                            />
                        </Box>
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
                        {!pUser && (
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

                        {pUser && (
                            <Stack direction={'row'} gap={1.5} alignItems={'center'}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        border: `1px solid ${theme.palette.primary.main}`,

                                        '& > a': {
                                            display: 'block !important',
                                            padding: '10px 14px !important',
                                            color: theme.palette.primary.main,
                                        },

                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main,
                                            '& a': {
                                                color: theme.palette.primary.contrastText,
                                            },
                                        },
                                    }}
                                    onClick={handleSetInitValuesForm}
                                >
                                    <Link to={'/create-news'}>Create News</Link>
                                </Button>
                                <Box
                                    sx={{
                                        borderRadius: theme.spacing(0.75),
                                        cursor: 'pointer',
                                        transition: '.2s ease-in-out',
                                        a: {
                                            display: 'block',
                                            padding: 1,
                                        },
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
                                    <Link to={'/notifications'}>
                                        <Badge
                                            color="error"
                                            badgeContent={pNumNotifications}
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
                                    </Link>
                                </Box>
                                <AccountMemu />
                            </Stack>
                        )}
                    </Stack>
                </Box>
            </Container>
        </Paper>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pNumNotifications: state.notify.numNotifications,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetInitValuesNewsForm: (values: INewsForm) => dispatch(setInitValueForm(values)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
