import { INewsForm, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { theme } from '@/utils'
import { Badge, Box, Button, Stack, Tooltip, alpha } from '@mui/material'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { AccountMenu } from '.'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setInitValueForm } from '@/store/news'
import { initNewsFormValues } from '@/data'

export interface IHeaderRightLoggedProps {
    pUser: IUser | null
    pNumNotifications: number
    pSetInitValuesNewsForm: (data: INewsForm) => void
}

function HeaderRightLogged({
    pUser,
    pNumNotifications,
    pSetInitValuesNewsForm,
}: IHeaderRightLoggedProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [showButtonCreate, setShowButtonCreate] = useState<boolean>(true)

    useEffect(() => {
        if (location.pathname.startsWith('/create-news')) {
            setShowButtonCreate(false)
        } else {
            setShowButtonCreate(true)
        }
    }, [navigate])

    const handleSetInitValuesForm = () => {
        pSetInitValuesNewsForm(initNewsFormValues)
    }

    return (
        pUser && (
            <Stack direction={'row'} gap={1.5} alignItems={'center'}>
                {showButtonCreate && (
                    <Button
                        variant="contained"
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'block',
                            },
                            border: `1px solid ${theme.palette.primary.main}`,

                            '& > a': {
                                display: 'block !important',
                                padding: '10px 14px !important',
                                color: theme.palette.primary.main,
                            },

                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                '& a': {
                                    color: theme.palette.primary.contrastText,
                                },
                            },
                        }}
                        onClick={handleSetInitValuesForm}
                    >
                        <Link to={'/create-news'}>{t('main_home.create_news')}</Link>
                    </Button>
                )}
                <Box
                    sx={{
                        borderRadius: theme.spacing(0.75),
                        cursor: 'pointer',
                        transition: '.2s ease-in-out',
                        a: {
                            display: 'block',
                            padding: 1,
                        },
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.dark, 0.1),
                            svg: {
                                color: theme.palette.primary.dark,
                            },
                        },
                    }}
                >
                    <Link to={'/notifications'}>
                        <Tooltip title={t('notifications.title')}>
                            <Badge
                                color="error"
                                badgeContent={pNumNotifications}
                                sx={{
                                    '& .MuiBadge-badge': {
                                        border: `1px solid ${theme.palette.primary.contrastText}`,
                                    },
                                }}
                            >
                                <NotificationsNoneOutlinedIcon
                                    sx={{
                                        fontSize: '30px',
                                        color: theme.palette.secondary.light,
                                    }}
                                />
                            </Badge>
                        </Tooltip>
                    </Link>
                </Box>
                <AccountMenu />
            </Stack>
        )
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pNumNotifications: state.notify.numNotifications,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetInitValuesNewsForm: (values: INewsForm) => dispatch(setInitValueForm(values)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRightLogged)
