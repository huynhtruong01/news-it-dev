import { Box, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SettingsForm } from '@/pages/Settings/components'
import { theme } from '@/utils'
import { IUser } from '@/models'
import { connect } from 'react-redux'
import { AppState } from '@/store'

export interface ISettingsProps {
    pUser: IUser | null
}

function Settings({ pUser }: ISettingsProps) {
    useEffect(() => {
        document.title = 'Settings - DEV Community'
    }, [])

    return (
        <Box>
            <Stack
                gap={2}
                sx={{
                    width: '100%',
                    maxWidth: 1024,
                    margin: 'auto',
                }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    fontWeight={700}
                    sx={{
                        a: {
                            color: theme.palette.primary.light,
                            '&:hover': {
                                color: theme.palette.primary.dark,
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    Settings for <Link to={'/profile'}>@{pUser?.username}</Link>
                </Typography>

                <Box marginTop={2}>
                    <SettingsForm user={pUser} />
                </Box>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(Settings)
