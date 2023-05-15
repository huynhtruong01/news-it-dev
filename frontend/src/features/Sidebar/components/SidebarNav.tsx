import { Icon } from '@/components/Common'
import { IObjectCommon } from '@/models'
import { theme } from '@/utils'
import { Box, Paper } from '@mui/material'
import { Link } from 'react-router-dom'

export function SidebarNav() {
    const lists: IObjectCommon[] = [
        // 'Home',
        // 'Reading List',
        // 'Listings',
        // 'Tags',
        // 'Video',
        // 'About',
        // 'Contact',
        // 'Guides',
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'Reading List',
            link: '/reading-list',
        },
        {
            name: 'Tags',
            link: '/tags',
        },
    ]

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
                {lists.map((item) => (
                    <Box
                        component="li"
                        key={item.name}
                        sx={{
                            width: '100%',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            padding: theme.spacing(0.75),
                            cursor: 'pointer',
                            borderRadius: theme.spacing(0.75),
                            a: {
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
                        <Box>
                            <Icon />
                        </Box>
                        <Link to={`${item.link}`}>{item.name}</Link>
                    </Box>
                ))}
            </Box>
        </Paper>
    )
}
