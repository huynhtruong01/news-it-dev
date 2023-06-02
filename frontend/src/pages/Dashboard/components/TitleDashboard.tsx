import { Typography, useMediaQuery } from '@mui/material'

export interface ITitleDashboardProps {
    text: string
    nums: number
}

export function TitleDashboard({ text, nums }: ITitleDashboardProps) {
    const isSmallScreen = useMediaQuery('(min-width:320px)')

    return (
        <Typography
            component="h2"
            variant={isSmallScreen ? 'body1' : 'h6'}
            fontWeight={700}
        >
            {text} ({nums})
        </Typography>
    )
}
