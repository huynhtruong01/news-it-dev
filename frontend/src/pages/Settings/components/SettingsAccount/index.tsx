import { Box } from '@mui/material'
import { useEffect } from 'react'
import { IUser } from '@/models'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { SettingsAccountForm } from '@/pages/Settings/components/SettingsAccount/components'

export interface ISettingsAccountProps {
    pUser: IUser | null
}

function SettingsAccount({ pUser }: ISettingsAccountProps) {
    useEffect(() => {
        document.title = 'Settings - DEV Community'
    }, [])

    return (
        <Box>
            <SettingsAccountForm emailAddress={pUser?.emailAddress as string} />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(SettingsAccount)
