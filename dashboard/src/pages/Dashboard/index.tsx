import { Box } from '@mui/material'
import { useEffect } from 'react'

export function Dashboard() {
    useEffect(() => {
        document.title = 'Home | Dashboard'
    }, [])

    return <Box component="section">Dashboard</Box>
}
