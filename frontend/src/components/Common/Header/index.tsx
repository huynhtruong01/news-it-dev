import {
    HeaderRightLogged,
    HeaderRightNotLogged,
    HeaderSearch,
} from '@/components/Common/Header/components'
import { theme } from '@/utils'
import SearchIcon from '@mui/icons-material/Search'
import {
    Box,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    alpha,
} from '@mui/material'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function Header() {
    const { t } = useTranslation()
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
                        alignItems: 'center',
                        gap: 2,
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
                        <HeaderSearch searchVal={searchVal} setSearchVal={setSearchVal} />
                    </Box>
                    <Box
                        component="form"
                        onSubmit={handleSearchNews}
                        sx={{
                            display: {
                                xs: 'block',
                                md: 'none',
                            },
                            flex: 1,
                        }}
                    >
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
                                        <IconButton
                                            type="submit"
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: alpha(
                                                        theme.palette.primary.main,
                                                        0.1
                                                    ),
                                                    svg: {
                                                        color: theme.palette.primary.main,
                                                    },
                                                },
                                            }}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            size="small"
                            placeholder={`${t('common.search')}...`}
                            onChange={handleSearchChange}
                            sx={{
                                width: '100%',
                                '.MuiInputBase-root': {
                                    paddingRight: 0,
                                },
                                fieldset: {
                                    paddingRight: 0,
                                },
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
                                    padding: theme.spacing(1.25, 1.75),
                                    fontWeight: 500,
                                },
                            },
                        }}
                    >
                        <HeaderRightNotLogged />
                        <HeaderRightLogged />
                    </Stack>
                </Box>
            </Container>
        </Paper>
    )
}
