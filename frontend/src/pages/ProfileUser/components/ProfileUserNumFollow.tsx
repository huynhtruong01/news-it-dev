import { theme } from '@/utils'
import { Box, Paper, Stack, Typography, alpha } from '@mui/material'
import { HiOutlineUser } from 'react-icons/hi'

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
                        gap: 1,
                        color: alpha(theme.palette.secondary.dark, 0.9),
                    },
                    svg: {
                        fontSize: theme.typography.h6,
                    },
                }}
            >
                <Stack direction={'row'} alignItems={'center'} gap={1.5} marginBottom={2}>
                    <Typography>
                        <HiOutlineUser />
                    </Typography>
                    <Typography>{numFollowed} followed</Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                    <Typography>
                        <HiOutlineUser />
                    </Typography>
                    <Typography>{numFollowing} following</Typography>
                </Stack>
            </Box>
        </Box>
    )
}
