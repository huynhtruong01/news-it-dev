import { Box } from '@mui/material'
import { useEffect } from 'react'
import { IUser } from '@/models'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { SettingsProfileForm } from '@/pages/Settings/components/SettingsProfile/components'

export interface ISettingsProfileProps {
    pUser: IUser | null
}

function SettingsProfile({ pUser }: ISettingsProfileProps) {
    useEffect(() => {
        document.title = 'Settings - DEV Community'
    }, [])

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
