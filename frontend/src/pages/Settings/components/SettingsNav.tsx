import { Box, Stack, alpha } from '@mui/material'
import { Link } from 'react-router-dom'
import { settingsNav } from '@/data'
import { theme } from '@/utils'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SelectFilter } from '@/components/Filters'
import { DEFAULT_SELECT_VALUE } from '@/consts'

export function SettingsNav() {
    const { t } = useTranslation()
    const [pathName, setPathName] = useState<string>('')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const path = location.pathname
        setPathName(path.toString())
    }, [navigate])

    const handleSettingSelect = (value: string | number) => {
        if (typeof value === 'string') navigate(value as string)
    }

    return (
        <Box width={'100%'}>
            {/* Settings Nav */}
            <Stack
                gap={1}
                sx={{
                    display: {
                        md: 'flex',
                        xs: 'none',
                    },
                }}
            >
                {settingsNav.map((nav) => (
                    <Box
                        key={nav.name}
                        sx={{
                            borderRadius: theme.spacing(0.75),
                            backgroundColor:
                                pathName === nav.link
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',
                            fontWeight: pathName === nav.link ? 500 : 400,
                            '&:hover': {
                                color: theme.palette.primary.main,
                                backgroundColor:
                                    pathName === nav.link
                                        ? theme.palette.primary.contrastText
                                        : alpha(theme.palette.primary.main, 0.075),
                            },
                            a: {
                                display: 'block',
                                padding: 1,
                            },
                        }}
                    >
                        <Link to={nav.link as string}>{t(nav.name as string)}</Link>
                    </Box>
                ))}
            </Stack>

            {/* Selection Nav */}
            <Box
                sx={{
                    display: {
                        md: 'none',
                        xs: 'block',
                    },
                }}
            >
                <SelectFilter
                    selects={settingsNav}
                    label=""
                    initValue={DEFAULT_SELECT_VALUE}
                    onFilterChange={handleSettingSelect}
                    isAll={false}
                    width={'100%'}
                />
            </Box>
        </Box>
    )
}
