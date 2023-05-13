import { IUser } from '@/models'
import { theme } from '@/utils'
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export interface IDashboardFollowItemProps {
    follow: IUser
}

export function DashboardFollowItem({ follow }: IDashboardFollowItemProps) {
    return (
        <Box
            component={Paper}
            elevation={1}
            sx={{
                textAlign: 'center',
                padding: 3,
            }}
        >
            <Stack direction={'row'} justifyContent={'center'}>
                {/* TODO: WRITE LINK HERE */}
                <Link to={'/'}>
                    <Avatar
                        src={follow.avatar}
                        alt={follow.username}
                        sx={{
                            width: 64,
                            height: 64,
                        }}
                    />
                </Link>
            </Stack>
            <Box marginTop={2}>
                <Typography
                    component="h3"
                    fontSize={'18px'}
                    fontWeight={700}
                    sx={{
                        color: theme.palette.primary.light,
                        '&:hover': {
                            color: theme.palette.primary.dark,
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {/* TODO: WRITE LINK HERE */}
                    <Link to={'/'}>
                        {follow.lastName} {follow.firstName}
                    </Link>
                </Typography>
                <Typography
                    sx={{
                        fontSize: theme.typography.body2,
                        color: theme.palette.grey[600],
                    }}
                >
                    @{follow.username}
                </Typography>
            </Box>
        </Box>
    )
}
