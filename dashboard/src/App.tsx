import { Route, Routes } from 'react-router-dom'
import { AuthLayout, MainLayout } from './layouts'
import { Dashboard, Users, Roles, HashTags, News, Login, Signup } from './pages'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import { AppState } from './store'
import { IUser } from './models'
import { NotFound } from './components'

export interface IApp {
    pUser: IUser | null
}

function App({ pUser }: IApp) {
    return (
        <Routes>
            {!pUser && (
                <Route path={'/'} element={<AuthLayout />}>
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/signup'} element={<Signup />} />
                </Route>
            )}
            {pUser && (
                <Route path={'/'} element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path={'/users/*'} element={<Users />} />
                    <Route path={'/roles/*'} element={<Roles />} />
                    <Route path={'/hash-tags/*'} element={<HashTags />} />
                    <Route path={'/news/*'} element={<News />} />
                </Route>
            )}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.userLogin,
    }
}

export default connect(mapStateToProps, null)(App)
