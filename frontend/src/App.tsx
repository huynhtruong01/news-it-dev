import { Login, News, Signup, Profile, Settings } from '@/pages'
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
                    <Route path={'/detail'} element={<News />} />
                    <Route path={'/profile'} element={<Profile />} />
                    <Route path={'/settings'} element={<Settings />} />
                </Routes>
            </MainLayout>
        </Box>
    )
}

export default App
