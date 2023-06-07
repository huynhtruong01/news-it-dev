import { useLinkUser } from '@/hooks'
import { IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export interface IDashboardFollowItemProps {
    follow: IUser
}

function DashboardFollowItem({ follow }: IDashboardFollowItemProps) {
    const linkUser = useLinkUser(follow)

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
                {/* WRITE LINK HERE */}
                <Link to={linkUser}>
                    <Avatar
                        src={follow.avatar as string}
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
                    {/* WRITE LINK HERE */}
                    <Link to={linkUser}>
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

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(DashboardFollowItem)
