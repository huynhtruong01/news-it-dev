import { Box, Stack, alpha } from '@mui/material'
import { Link } from 'react-router-dom'
import { settingsNav } from '@/data'
import { theme } from '@/utils'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function SettingsNav() {
    const [pathName, setPathName] = useState<string>('')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const path = location.pathname.split('/')[2]
        setPathName(path.toString())
    }, [navigate])

    return (
        <Box width={'100%'}>
            <Stack gap={1}>
                {settingsNav.map((nav) => (
                    <Box
                        key={nav.name}
                        sx={{
                            borderRadius: theme.spacing(0.75),
                            backgroundColor:
                                pathName === nav.name.toLowerCase()
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',
                            fontWeight: pathName === nav.name.toLowerCase() ? 500 : 400,
                            '&:hover': {
                                color: theme.palette.primary.main,
                                backgroundColor:
                                    pathName === nav.name.toLowerCase()
                                        ? theme.palette.primary.contrastText
                                        : alpha(theme.palette.primary.main, 0.075),
                            },
                            a: {
                                display: 'block',
                                padding: 1,
                            },
                        }}
                    >
                        <Link to={nav.link}>{nav.name}</Link>
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
