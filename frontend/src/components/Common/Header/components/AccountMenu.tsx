import { theme } from '@/utils'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import {
    Avatar,
    Box,
    BoxProps,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography,
    alpha,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleIcon from '@mui/icons-material/Article'
import { connect } from 'react-redux'
import { AppDispatch, AppState } from '@/store'
import { INewsForm, IUser } from '@/models'
import GTranslateIcon from '@mui/icons-material/GTranslate'
import { useTranslation } from 'react-i18next'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { initNewsFormValues, languagesListSelect } from '@/data'
import { setLanguages } from '@/store/common'
import DescriptionIcon from '@mui/icons-material/Description'
import i18next from 'i18next'
import { setInitValueForm } from '@/store/news'

export interface IAccountMenuProps extends BoxProps {
    pUser: IUser | null
    pLanguages: string
    pSetLanguages: (lang: string) => void
    pSetInitValuesNewsForm: (data: INewsForm) => void
}

function AccountMenu({
    pUser,
    pLanguages,
    pSetLanguages,
    pSetInitValuesNewsForm,
}: IAccountMenuProps) {
    const { t } = useTranslation()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [anchorLang, setAnchorLang] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const openLang = Boolean(anchorLang)

    const handleOpenClick = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseClick = () => {
        setAnchorEl(null)
    }

    const handleOpenLangClick = () => {
        setAnchorLang(anchorEl)
        setAnchorEl(null)
    }

    const handleCloseLang = () => {
        setAnchorLang(null)
        setAnchorEl(anchorLang)
    }

    const handleCloseAll = () => {
        setAnchorEl(null)
        setAnchorLang(null)
    }

    const handleSelectLang = (value: string) => {
        i18next.changeLanguage(value)
        pSetLanguages(value)
    }

    const handleSetInitValuesForm = () => {
        pSetInitValuesNewsForm(initNewsFormValues)
    }

    return (
        <Box>
            <Tooltip title={pUser?.username}>
                <IconButton
                    onClick={handleOpenClick}
                    size="small"
                    sx={{ borderRadius: '50% !important' }}
                >
                    <Avatar
                        src={pUser?.avatar as string}
                        sx={{
                            width: 44,
                            height: 44,
                            border: '0.25rem solid transparent',
                            '&:hover': {
                                borderColor: theme.palette.grey[200],
                            },
                        }}
                        alt={pUser?.username}
                    />
                </IconButton>
            </Tooltip>

            {/* dashboard */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseClick}
                onClick={handleCloseClick}
                PaperProps={{
                    elevation: 1,
                    sx: {
                        borderRadius: theme.spacing(0.75),
                        overflow: 'visible',
                        mt: 0.5,
                        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
                        width: {
                            md: 250,
                            xs: '100%',
                        },
                        padding: 1,
                        ul: {
                            padding: 0,
                        },
                        li: {
                            borderRadius: theme.spacing(0.75),
                            padding: 0,
                            a: {
                                display: 'block',
                                width: '100%',
                                padding: theme.spacing(1, 2),
                            },
                            '.row': {
                                display: 'block',
                                width: '100%',
                                padding: theme.spacing(1, 2),
                                '&:hover': {
                                    span: {
                                        textDecoration: 'none',
                                    },
                                },
                            },
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.dark, 0.15),
                                color: theme.palette.primary.dark,
                                svg: {
                                    color: theme.palette.primary.dark,
                                },
                                span: {
                                    textDecoration: 'underline',
                                },
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                disableScrollLock={true}
            >
                <MenuItem>
                    <Link to={'/profile'}>
                        <Stack alignItems={'flex-start'}>
                            <Typography component="span" fontWeight={500}>
                                {pUser?.lastName} {pUser?.firstName}
                            </Typography>
                            <Typography component="small" fontSize={'14px'}>
                                @{pUser?.username}
                            </Typography>
                        </Stack>
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Link to={'/dashboard'}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon>
                                <DashboardIcon fontSize="small" />
                            </ListItemIcon>
                            <span>{t('dashboard.dashboard')}</span>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem
                    sx={{
                        display: {
                            md: 'none',
                            sm: 'block',
                        },
                    }}
                >
                    <Link to={'/create-news'} onClick={handleSetInitValuesForm}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon>
                                <DescriptionIcon fontSize="small" />
                            </ListItemIcon>
                            <span>{t('dashboard.create_news')}</span>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to={'/reading-list'}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon>
                                <ArticleIcon fontSize="small" />
                            </ListItemIcon>
                            <span>{t('dashboard.reading_list')}</span>
                        </Stack>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Box className="row" onClick={handleOpenLangClick}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon>
                                <GTranslateIcon fontSize="small" />
                            </ListItemIcon>
                            <span>{t('dashboard.languages')}</span>
                        </Stack>
                    </Box>
                </MenuItem>
                <MenuItem>
                    <Link to={'/settings/profile'}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <span>{t('dashboard.settings')}</span>
                        </Stack>
                    </Link>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Link to={'/signout-confirm'}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <span>{t('auth.signout')}</span>
                        </Stack>
                    </Link>
                </MenuItem>
            </Menu>

            {/* languages */}
            <Menu
                anchorEl={anchorLang}
                open={openLang}
                onClose={handleCloseAll}
                PaperProps={{
                    elevation: 1,
                    sx: {
                        borderRadius: theme.spacing(0.75),
                        overflow: 'visible',
                        mt: 0.5,
                        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
                        width: {
                            md: 250,
                            xs: '100%',
                        },
                        padding: 1,
                        ul: {
                            padding: 0,
                        },
                        li: {
                            borderRadius: theme.spacing(0.75),
                            padding: 0,
                            marginBottom: 0.5,

                            a: {
                                display: 'block',
                                width: '100%',
                                padding: theme.spacing(1, 2),
                            },
                            '.row': {
                                display: 'block',
                                width: '100%',
                                padding: theme.spacing(0, 2, 0, 0),

                                '.MuiListItemIcon-root': {
                                    justifyContent: 'center',
                                    borderRadius: theme.spacing(0.75),
                                    padding: theme.spacing(1, 0),

                                    '&:hover': {
                                        backgroundColor: alpha(
                                            theme.palette.primary.dark,
                                            0.15
                                        ),
                                        color: theme.palette.primary.dark,
                                    },
                                },
                                '&:hover': {
                                    span: {
                                        textDecoration: 'none',
                                    },
                                },
                            },
                            '.lang': {
                                padding: theme.spacing(1, 2),
                                '&:hover': {
                                    span: {
                                        textDecoration: 'none',
                                    },
                                },
                            },
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.dark, 0.15),
                                color: theme.palette.primary.dark,
                                svg: {
                                    color: theme.palette.primary.dark,
                                },
                                '& .lang': {
                                    span: {
                                        textDecoration: 'none',
                                    },
                                },
                                span: {
                                    textDecoration: 'underline',
                                },
                                '&.noHover': {
                                    backgroundColor: 'transparent',
                                    color: 'inherit',
                                    svg: {
                                        color: 'inherit',
                                    },
                                },
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                disableScrollLock={true}
            >
                <MenuItem className="noHover">
                    <Box className="row">
                        <Stack direction={'row'} alignItems={'center'}>
                            <ListItemIcon onClick={handleCloseLang}>
                                <ArrowBackIosIcon fontSize="small" />
                            </ListItemIcon>
                            <Stack flex={1} alignItems={'center'}>
                                <Typography
                                    component="small"
                                    fontWeight={700}
                                    sx={{
                                        color: theme.palette.secondary.main,
                                        marginLeft: -2,
                                    }}
                                >
                                    {t('dashboard.languages')}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </MenuItem>
                <Divider />
                {languagesListSelect.map((lang) => (
                    <MenuItem
                        key={lang.value}
                        sx={{
                            backgroundColor:
                                pLanguages === lang.value
                                    ? alpha(theme.palette.primary.dark, 0.15)
                                    : 'tranparent',
                            color:
                                pLanguages === lang.value
                                    ? theme.palette.primary.dark
                                    : 'inherit',
                            fontWeight: pLanguages === lang.value ? 500 : 400,
                        }}
                        onClick={() => handleSelectLang(lang.value as string)}
                    >
                        <Box className="lang">
                            <span>{lang.name}</span>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pLanguages: state.common.languages,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetLanguages: (lang: string) => dispatch(setLanguages(lang)),
        pSetInitValuesNewsForm: (values: INewsForm) => dispatch(setInitValueForm(values)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu)
