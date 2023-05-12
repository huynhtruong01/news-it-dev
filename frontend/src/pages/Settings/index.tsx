// export interface ISettingsProps  {}

import { user } from '@/data'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SettingsForm } from '@/pages/Settings/components'
import { theme } from '@/utils'

export function Settings() {
    const {
        avatar,
        username,
        bio,
        dateJoined,
        work,
        skillLanguages,
        newsCount,
        comments,
        hashTags,
        news,
    } = user

    // TODO: FETCH PROFILE USER TO EDIT

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
                    {/* TODO: WRITE LINK HERE */}
                    Settings for <Link to={'/profile'}>@{username}</Link>
                </Typography>

                <Box marginTop={2}>
                    <SettingsForm user={user} />
                </Box>
            </Stack>
        </Box>
    )
}
