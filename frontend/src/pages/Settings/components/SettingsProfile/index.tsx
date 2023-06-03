import { IUser } from '@/models'
import { SettingsProfileForm } from '@/pages/Settings/components/SettingsProfile/components'
import { AppState } from '@/store'
import { Box } from '@mui/material'
import { connect } from 'react-redux'
export interface ISettingsProfileProps {
    pUser: IUser | null
}

function SettingsProfile({ pUser }: ISettingsProfileProps) {
    return (
        <Box>
            <SettingsProfileForm user={pUser} />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(SettingsProfile)
