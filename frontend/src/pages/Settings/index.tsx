import { Seo, TitlePage } from '@/components/Common'
import { IUser } from '@/models'
import {
    SettingsAccount,
    SettingsModalDelete,
    SettingsNav,
    SettingsProfile,
} from '@/pages/Settings/components'
import { AppState } from '@/store'
import { theme } from '@/utils'
import { Box, Grid, Stack } from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

export interface ISettingsProps {
    pUser: IUser | null
}

function Settings({ pUser }: ISettingsProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!pUser) navigate('/login')
    }, [])

    return (
        <Box>
            <Seo
                title={`${t('title_document.settings')} - ${t(
                    'title_document.news_community'
                )}`}
            />
            <Stack
                gap={2}
                sx={{
                    width: '100%',
                    maxWidth: 1024,
                    margin: 'auto',
                }}
            >
                <TitlePage
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
                </TitlePage>

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
