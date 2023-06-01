import { Icon, ListingIcon, TagIcon } from '@/components/Common'
import { navMainHome } from '@/data'
import { theme } from '@/utils'
import { Box, Paper, alpha } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function SidebarNav() {
    const { t } = useTranslation()

    return (
        <Paper
            elevation={1}
            component="nav"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
        >
            <Box component="ul">
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

                            a: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                padding: theme.spacing(0.75),
                                flex: 1,
                            },

                            '&:hover': {
                                backgroundColor: '#3b49df1a',
                                a: {
                                    color: theme.palette.primary.main,
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
            </Box>
        </Paper>
    )
}
