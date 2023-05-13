import {
    Login,
    News,
    Signup,
    Profile,
    Settings,
    Dashboard,
    Tags,
    ReadingList,
} from '@/pages'
import { Header } from '@components/common/index'
import { MainLayout } from '@layouts/index'
import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { MainContent } from '@features/index'

function App() {
    return (
        <Box>
            <Header />
            <MainLayout>
                <Routes>
                    <Route path={'/'} element={<MainContent />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/signup'} element={<Signup />} />
                    <Route path={'/news/:slug'} element={<News />} />
                    <Route path={'/profile'} element={<Profile />} />
                    <Route path={'/settings'} element={<Settings />} />
                    <Route path={'/dashboard/*'} element={<Dashboard />} />
                    <Route path={'/tags/*'} element={<Tags />} />
                    <Route path={'/reading-list'} element={<ReadingList />} />
                </Routes>
            </MainLayout>
        </Box>
    )
}

export default App
