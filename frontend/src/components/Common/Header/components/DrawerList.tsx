import { languagesListSelect, navMainHome } from '@/data'
import { IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setLanguages } from '@/store/common'
import { theme } from '@/utils'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Collapse, Drawer, Paper, Stack, alpha } from '@mui/material'
import i18next from 'i18next'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FcWikipedia } from 'react-icons/fc'
import { connect } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Icon, ListingIcon, TagIcon } from '../..'

export interface IDrawerListProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    pUser: IUser | null
    pLanguages: string
    pSetLanguages: (lang: string) => void
}

function DrawerList({
    open,
    setOpen,
    pUser,
    pLanguages,
    pSetLanguages,
}: IDrawerListProps) {
    const { t } = useTranslation()
    const [activeLink, setActiveLink] = useState<string>('')
    const navigate = useNavigate()
    const location = useLocation()
    const [openLanguages, setOpenLanguages] = useState<boolean>(false)

    useEffect(() => {
        setActiveLink(location.pathname)
    }, [navigate])

    const handleToggleLanguages = () => {
        setOpenLanguages((prev) => !prev)
    }

    const handleSetActiveLink = (link: string) => {
        setActiveLink(link)
        handleClose()
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSelectLang = (value: string) => {
        i18next.changeLanguage(value)
        pSetLanguages(value)
    }

    return (
        <Drawer anchor={'left'} open={open} onClose={handleClose}>
            <Box
                role="presentation"
                // onClick={handleClose}
                onKeyDown={handleClose}
                sx={{ width: 250, padding: 2 }}
            >
                <Box
                    sx={{
                        width: 50,
                        height: 40,
                        a: {
                            display: 'inline-block',
                        },
                        margin: 'auto',
                    }}
                >
                    <Link to={'/'} onClick={handleClose}>
                        <img
                            src={
                                'https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png'
                            }
                            alt="logo"
                        />
                    </Link>
                </Box>

                <Paper
                    elevation={1}
                    component="nav"
                    sx={{
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        marginTop: 3,
                    }}
                >
                    <Stack gap={1}>
                        {navMainHome.map((item) => {
                            if (!pUser?.id && item.name === 'main_home.reading_list')
                                return

                            return (
                                <Box
                                    component="li"
                                    title={item.name as string}
                                    key={item.name}
                                    sx={{
                                        width: '100%',
                                        cursor: 'pointer',
                                        borderRadius: theme.spacing(0.75),
                                        color: alpha(theme.palette.secondary.main, 0.9),
                                        backgroundColor:
                                            activeLink === item.link
                                                ? alpha(theme.palette.primary.dark, 0.1)
                                                : 'transparent',

                                        a: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            padding: theme.spacing(0.75),
                                            flex: 1,
                                            color: theme.palette.primary.main,
                                        },

                                        '&:hover': {
                                            backgroundColor: '#3b49df1a',
                                            a: {
                                                textDecoration: 'underline',
                                            },
                                        },
                                    }}
                                    onClick={() =>
                                        handleSetActiveLink(item.link as string)
                                    }
                                >
                                    <Link
                                        to={`${item.link}`}
                                        title={t(item.name as string) as string}
                                    >
                                        <Box>
                                            {item.name === 'main_home.home' && <Icon />}
                                            {item.name === 'main_home.reading_list' && (
                                                <ListingIcon />
                                            )}
                                            {item.name === 'main_home.tags' && (
                                                <TagIcon />
                                            )}
                                        </Box>
                                        {t(item.name as string)}
                                    </Link>
                                </Box>
                            )
                        })}

                        {/* translate */}
                        {!pUser && (
                            <>
                                <Box
                                    component="li"
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        cursor: 'pointer',
                                        padding: theme.spacing(0.75),
                                        color: theme.palette.primary.main,
                                        borderRadius: theme.spacing(0.75),
                                    }}
                                    onClick={handleToggleLanguages}
                                >
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        gap={1}
                                        sx={{
                                            svg: {
                                                width: 24,
                                                height: 24,
                                            },
                                        }}
                                    >
                                        <FcWikipedia />
                                        {t('dashboard.languages')}
                                    </Stack>
                                    {openLanguages ? (
                                        <KeyboardArrowDownIcon />
                                    ) : (
                                        <KeyboardArrowUpIcon />
                                    )}
                                </Box>
                                <Collapse in={openLanguages} timeout="auto" unmountOnExit>
                                    <Stack gap={1} component={'ul'} marginLeft={3.5}>
                                        {languagesListSelect.map((l) => (
                                            <Box
                                                key={l.value}
                                                component={'li'}
                                                sx={{
                                                    padding: 1,
                                                    backgroundColor:
                                                        pLanguages === l.value
                                                            ? alpha(
                                                                  theme.palette.primary
                                                                      .dark,
                                                                  0.1
                                                              )
                                                            : 'inherit',
                                                    borderRadius: theme.spacing(0.75),
                                                    fontSize: theme.typography.body2,
                                                    color:
                                                        pLanguages === l.value
                                                            ? theme.palette.primary.main
                                                            : 'inherit',
                                                }}
                                            >
                                                <Box
                                                    className="lang"
                                                    onClick={() =>
                                                        handleSelectLang(
                                                            l.value as string
                                                        )
                                                    }
                                                >
                                                    <span>{l.name}</span>
                                                </Box>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Collapse>
                            </>
                        )}
                    </Stack>
                </Paper>
            </Box>
        </Drawer>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerList)
