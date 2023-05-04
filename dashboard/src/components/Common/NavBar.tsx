import LogoutIcon from '@mui/icons-material/Logout'
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navList } from '../../data'
import { theme } from '../../utils'

export function NavBar() {
    const [navLink, setNavLink] = useState<string>('')
    const location = useLocation()
    const navigate = useNavigate()
    console.log('location: ', location)

    useEffect(() => {
        const firstPath = location.pathname.split('/')[1]
        setNavLink(`/${firstPath}`)
    }, [])

    const handleNavChange = (link: string) => {
        setNavLink(link)
        navigate(link)
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                minHeight: '100vh',
                width: 250,
                backgroundColor: theme.palette.grey[300],
                zIndex: 50,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: theme.spacing(2),
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 2.5,

                            a: {
                                width: 60,
                                borderRadius: 1.5,
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

                    <Box
                        component="nav"
                        sx={{
                            width: '100%',
                            a: {
                                display: 'block',
                                width: '100%',
                            },
                        }}
                    >
                        <List
                            sx={{
                                width: '100%',
                            }}
                        >
                            {navList.map((nav, idx) => {
                                const Icon = nav.icon

                                return (
                                    <ListItem
                                        key={`${nav.name} ${idx}`}
                                        sx={{
                                            paddingLeft: 0,
                                            paddingRight: 0,
                                        }}
                                    >
                                        <Box
                                            onClick={() => handleNavChange(nav.link)}
                                            sx={{
                                                width: '100%',
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{
                                                    borderRadius: 1,
                                                    backgroundColor:
                                                        navLink === nav.link
                                                            ? '#fff'
                                                            : 'transparent',

                                                    '&:hover': {
                                                        backgroundColor: '#fff',
                                                        color: '#000',
                                                    },
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Icon />
                                                </ListItemIcon>
                                                <ListItemText primary={nav.name} />
                                            </ListItemButton>
                                        </Box>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <ListItem>
                        <ListItemButton
                            sx={{
                                backgroundColor: red[700],
                                color: '#fff',
                                borderRadius: 1,

                                svg: {
                                    color: '#fff',
                                },

                                '&:hover': {
                                    backgroundColor: red[900],
                                },
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Logout"
                                sx={{
                                    fontWeight: 600,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Box>
            </Box>
        </Box>
    )
}
