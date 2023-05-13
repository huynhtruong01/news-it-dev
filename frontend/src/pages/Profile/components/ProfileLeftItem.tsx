import { Box, Typography, Paper } from '@mui/material'
import { theme } from '@/utils'

export interface IProfileLeftItemProps {
    title: string
    value: string | number
}

export function ProfileLeftItem({ title, value }: IProfileLeftItemProps) {
    return (
        <Box component={Paper} elevation={1}>
            <Typography
                component="h3"
                variant="body1"
                padding={theme.spacing(1.5, 2)}
                fontWeight={700}
            >
                {title}
            </Typography>
            <Typography padding={theme.spacing(2)}>{value}</Typography>
        </Box>
    )
}
