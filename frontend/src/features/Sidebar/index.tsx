import { Box, BoxProps, Stack } from '@mui/material'
import { SidebarHeader, SidebarNav, SidebarTag } from '@/features/Sidebar/components'
import { AppState } from '@/store'
import { connect } from 'react-redux'
import { IUser } from '@/models'

export interface ISidebarProps extends BoxProps {
    pUser: IUser | null
}

function Sidebar({ pUser, ...rest }: ISidebarProps) {
    return (
        <Box {...rest}>
            <Box component="aside">
                <Stack direction={'column'} spacing={2}>
                    {!pUser?.id && <SidebarHeader />}
                    <SidebarNav />
                    <SidebarTag />
                </Stack>
            </Box>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(Sidebar)
