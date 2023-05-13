import { user } from '@/data'
import {
    DashboardLeftList,
    DashboardNews,
    DashboardReadingList,
    DashboardTags,
} from '@/pages/Dashboard/components'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { DashboardFollow } from './components/DashboardFollow'

export function Dashboard() {
    const {
        avatar,
        username,
        bio,
        dateJoined,
        work,
        skillLanguages,
        currentlyLearning,
        newsCount,
        comments,
        hashTags,
        followers,
        following,
        saves,
        news,
    } = user

    useEffect(() => {
        document.title = 'Dashboard - DEV Community'
    }, [])

    // TODO: FETCH USER PROFILE

    return (
        <Box>
            <Box>
                <Box marginBottom={2}>
                    <Typography component="h1" variant="h4" fontWeight={700}>
                        Dashboard
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '240px 1fr',
                        gap: 2,
                    }}
                >
                    <Box>
                        <DashboardLeftList user={user} />
                    </Box>
                    <Box>
                        <Routes>
                            <Route index element={<DashboardNews newsList={news} />} />
                            <Route
                                path="followers"
                                element={<DashboardFollow follows={followers} />}
                            />
                            <Route
                                path="following"
                                element={<DashboardFollow follows={following} />}
                            />
                            <Route
                                path="tags"
                                element={<DashboardTags tags={hashTags} />}
                            />
                            <Route
                                path="reading-list"
                                element={<DashboardReadingList saves={saves} />}
                            />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
