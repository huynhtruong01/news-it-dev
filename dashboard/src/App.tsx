import { Route, Routes } from 'react-router-dom'
import { AuthLayout, MainLayout } from './layouts'
import { Dashboard, Users, Roles, HashTags, News, Login, Signup } from './pages'

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<AuthLayout />}>
                <Route path={'/login'} element={<Login />} />
                <Route path={'/signup'} element={<Signup />} />
            </Route>
            <Route path={'/'} element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path={'/users/*'} element={<Users />} />
                <Route path={'/roles/*'} element={<Roles />} />
                <Route path={'/hash-tags/*'} element={<HashTags />} />
                <Route path={'/news/*'} element={<News />} />
            </Route>
        </Routes>
    )
}

export default App
