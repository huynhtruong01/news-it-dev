import { navMainHome } from '@/data'
import { theme } from '@/utils'
import { Box, Drawer, Paper, Stack, alpha } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Icon, ListingIcon, TagIcon } from '../..'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { IUser } from '@/models'

export interface IDrawerListProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    pUser: IUser | null
}

function DrawerList({ open, setOpen, pUser }: IDrawerListProps) {
    const { t } = useTranslation()
    const [activeLink, setActiveLink] = useState<string>('')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setActiveLink(location.pathname)
    }, [navigate])

    const handleSetActiveLink = (link: string) => {
        setActiveLink(link)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Drawer anchor={'left'} open={open} onClose={handleClose}>
            <Box
                role="presentation"
                onClick={handleClose}
                onKeyDown={handleClose}
                sx={{ width: 250, padding: 2 }}
            >
                <Box
                    sx={{
                        width: 50,
                        height: 40,
                        a: {
                            display: 'inline-block',
                        },
                        margin: 'auto',
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

                <Paper
                    elevation={1}
                    component="nav"
                    sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        marginTop: 3,
                    }}
                >
                    <Stack gap={1}>
                        {navMainHome.map((item) => {
                            if (!pUser?.id && item.name === 'main_home.reading_list')
                                return

                            return (
                                <Box
                                    component="li"
                                    title={item.name as string}
                                    key={item.name}
                                    sx={{
                                        width: '100%',
                                        cursor: 'pointer',
                                        borderRadius: theme.spacing(0.75),
                                        color: alpha(theme.palette.secondary.main, 0.9),
                                        backgroundColor:
                                            activeLink === item.link
                                                ? alpha(theme.palette.primary.dark, 0.1)
                                                : 'transparent',

                                        a: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            padding: theme.spacing(0.75),
                                            flex: 1,
                                            color: theme.palette.primary.main,
                                        },

                                        '&:hover': {
                                            backgroundColor: '#3b49df1a',
                                            a: {
                                                textDecoration: 'underline',
                                            },
                                        },
                                    }}
                                    onClick={() =>
                                        handleSetActiveLink(item.link as string)
                                    }
                                >
                                    <Link
                                        to={`${item.link}`}
                                        title={t(item.name as string) as string}
                                    >
                                        <Box>
                                            {item.name === 'main_home.home' && <Icon />}
                                            {item.name === 'main_home.reading_list' && (
                                                <ListingIcon />
                                            )}
                                            {item.name === 'main_home.tags' && (
                                                <TagIcon />
                                            )}
                                        </Box>
                                        {t(item.name as string)}
                                    </Link>
                                </Box>
                            )
                        })}
                    </Stack>
                </Paper>
            </Box>
        </Drawer>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(DrawerList)
