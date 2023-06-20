import { Box, Divider } from '@mui/material'
import { UserFollowing, UserSuggestion } from '@/features/UserSidebar/components'
import { IUser } from '@/models'
import { theme } from '@/utils'

export interface IUserSidebarProps {
    user: IUser | null
}

export function UserSidebar({ user }: IUserSidebarProps) {
    return (
        <Box>
            <UserFollowing
                user={user}
                sx={{
                    padding: theme.spacing(2, 0, 2, 1),
                }}
            />
            {user && (
                <>
                    <Divider />
                    <UserSuggestion
                        sx={{
                            padding: theme.spacing(2, 0, 2, 1),
                        }}
                    />
                </>
            )}
        </Box>
    )
}
