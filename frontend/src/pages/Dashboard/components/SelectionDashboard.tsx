import { selectsDashboard } from '@/data'
import { SelectDashboard } from '@/enums'
import { theme } from '@/utils'
import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

export type ISelectDashboardVal = (typeof SelectDashboard)[keyof typeof SelectDashboard]

export function SelectionDashboard() {
    const [val, setVal] = useState<string>('/dashboard')
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setVal(location.pathname)
    }, [navigate])

    const handleValChange = (e: SelectChangeEvent) => {
        const { value } = e.target
        navigate(value)
        setVal(value)
    }

    return (
        <Box width={'100%'}>
            <Select
                fullWidth
                size="small"
                value={val}
                onChange={handleValChange}
                sx={{
                    backgroundColor: theme.palette.primary.contrastText,
                }}
            >
                {selectsDashboard.map((d) => (
                    <MenuItem key={d.value} value={d.link}>
                        {t(d.name as string)}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    )
}
