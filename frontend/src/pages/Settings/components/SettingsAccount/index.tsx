import { Box } from '@mui/material'
import { IUser } from '@/models'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { SettingsAccountForm } from '@/pages/Settings/components/SettingsAccount/components'

export interface ISettingsAccountProps {
    pUser: IUser | null
}

function SettingsAccount({ pUser }: ISettingsAccountProps) {
    return (
        <Box>
            <SettingsAccountForm
                emailAddress={pUser?.emailAddress as string}
                type={pUser?.type}
            />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(SettingsAccount)
