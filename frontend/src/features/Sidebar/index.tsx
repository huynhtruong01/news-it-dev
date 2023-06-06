import { Box, Stack } from '@mui/material'
import { SidebarHeader, SidebarNav, SidebarTag } from '@/features/Sidebar/components'
import { AppState } from '@/store'
import { connect } from 'react-redux'
import { IUser } from '@/models'

export interface ISidebarProps {
    pUser: IUser | null
}

function Sidebar({ pUser }: ISidebarProps) {
    return (
        <Box width={'100%'}>
            <Box component="aside">
                <Stack direction={'column'} spacing={2}>
                    {!pUser && <SidebarHeader />}
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
