import { Box, Stack, Typography, Grid } from '@mui/material'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    SettingsProfile,
    SettingsAccount,
    SettingsNav,
} from '@/pages/Settings/components'
import { theme } from '@/utils'
import { IUser } from '@/models'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { Routes, Route } from 'react-router-dom'
import { SettingsModalDelete } from '@/pages/Settings/components'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export interface ISettingsProps {
    pUser: IUser | null
}

function Settings({ pUser }: ISettingsProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pUser) {
            document.title = `${t('title_document.settings')} - ${t(
                'title_document.news_community'
            )}`
        } else {
            navigate('/login')
        }
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
                    {t('settings.title')} <Link to={'/profile'}>@{pUser?.username}</Link>
                </Typography>

                <Box marginTop={2}>
                    <Grid container spacing={2}>
                        <Grid
                            item
                            sx={{
                                width: {
                                    md: 240,
                                    xs: '100%',
                                },
                            }}
                        >
                            <SettingsNav />
                        </Grid>
                        <Grid item xs={12} md>
                            <Routes>
                                <Route path="profile" element={<SettingsProfile />} />
                                <Route path="accounts" element={<SettingsAccount />} />
                            </Routes>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            <SettingsModalDelete />
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(Settings)
