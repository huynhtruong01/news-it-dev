import { navMainHome } from '@/data'
import { theme } from '@/utils'
import { Box, Drawer, Paper, Stack, alpha } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { Icon, ListingIcon, TagIcon } from '../..'
import { useTranslation } from 'react-i18next'

export interface IDrawerListProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export function DrawerList({ open, setOpen }: IDrawerListProps) {
    const { t } = useTranslation()
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
                        {navMainHome.map((item) => (
                            <Box
                                component="li"
                                title={item.name as string}
                                key={item.name}
                                sx={{
                                    width: '100%',
                                    cursor: 'pointer',
                                    borderRadius: theme.spacing(0.75),
                                    color: alpha(theme.palette.secondary.main, 0.9),
                                    backgroundColor: '#3b49df1a',

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
                                        {item.name === 'main_home.tags' && <TagIcon />}
                                    </Box>
                                    {t(item.name as string)}
                                </Link>
                            </Box>
                        ))}
                    </Stack>
                </Paper>
            </Box>
        </Drawer>
    )
}
