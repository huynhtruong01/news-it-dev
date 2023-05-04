import { INavbar } from '../models'
import ArticleIcon from '@mui/icons-material/Article'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FolderSharedIcon from '@mui/icons-material/FolderShared'
import GroupIcon from '@mui/icons-material/Group'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

export const toastConfig = {
    position: 'top-right',
    autoClose: 5000,
    closeOnClick: true,
}

export const navList: INavbar[] = [
    {
        name: 'Dashboard',
        link: '/',
        icon: DashboardIcon,
    },
    {
        name: 'Users',
        link: '/users',
        icon: GroupIcon,
    },
    {
        name: 'News',
        link: '/news',
        icon: ArticleIcon,
    },
    {
        name: 'Hash Tags',
        link: '/hash-tags',
        icon: LocalOfferIcon,
    },
    {
        name: 'Roles',
        link: '/roles',
        icon: FolderSharedIcon,
    },
]
