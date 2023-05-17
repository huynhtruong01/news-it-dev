import { theme } from '@/utils'
import { Box, Paper, Typography, alpha } from '@mui/material'

export interface IProfileUserNumFollowProps {
    numFollowed: number
    numFollowing: number
}

export function ProfileUserNumFollow({
    numFollowed,
    numFollowing,
}: IProfileUserNumFollowProps) {
    return (
        <Box component={Paper} elevation={1} padding={2}>
            <Box
                sx={{
                    div: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        color: alpha(theme.palette.secondary.dark, 0.9),
                    },
                }}
            >
                <Box marginBottom={2}>
                    <Typography>{numFollowed}</Typography>
                    <Typography>followed</Typography>
                </Box>
                <Box>
                    <Typography>{numFollowing}</Typography>
                    <Typography>following</Typography>
                </Box>
            </Box>
        </Box>
    )
}
