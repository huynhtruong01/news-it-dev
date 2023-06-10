import {
    DrawerList,
    HeaderRightLogged,
    HeaderRightNotLogged,
    HeaderSearch,
} from '@/components/Common/Header/components'
import { theme } from '@/utils'
import DehazeIcon from '@mui/icons-material/Dehaze'
import { Box, Container, IconButton, Paper, Stack, alpha } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function Header() {
    const [showNav, setShowNav] = useState<boolean>(false)
    const [searchVal, setSearchVal] = useState<string>('')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!location.pathname.startsWith('/search')) setSearchVal('')
    }, [navigate])

    return (
        <>
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
                <Container
                    sx={{
                        paddingTop: '0 !important',
                        paddingBottom: '0 !important',
                    }}
                >
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
                            <>
                                <Box
                                    sx={{
                                        display: {
                                            md: 'block',
                                            xs: 'none',
                                        },
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
                                <IconButton
                                    sx={{
                                        display: {
                                            md: 'none',
                                            xs: 'inline-flex',
                                        },
                                        backgroundColor: alpha(
                                            theme.palette.primary.main,
                                            0.075
                                        ),
                                        svg: {
                                            color: theme.palette.primary.main,
                                        },
                                        '&:hover': {
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.075
                                            ),
                                        },
                                    }}
                                    onClick={() => setShowNav(true)}
                                >
                                    <DehazeIcon />
                                </IconButton>
                            </>
                            <HeaderSearch
                                searchVal={searchVal}
                                setSearchVal={setSearchVal}
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'block',
                                    },
                                }}
                            />
                        </Box>
                        <HeaderSearch
                            searchVal={searchVal}
                            setSearchVal={setSearchVal}
                            sx={{
                                flex: 1,
                                display: {
                                    md: 'none',
                                    xs: 'block',
                                },
                            }}
                        />
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
            <DrawerList open={showNav} setOpen={setShowNav} />
        </>
    )
}
