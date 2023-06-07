import { LOGO } from '@/consts'
import { AppDispatch, AppState } from '@/store'
import { setShowModalAuth } from '@/store/common'
import { theme } from '@/utils'
import CloseIcon from '@mui/icons-material/Close'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
    alpha,
    useMediaQuery,
} from '@mui/material'
import { ReactNode } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export interface IModalAuth {
    pIsShowModalAuth: boolean
    pSetShowModalAuth: (isShow: boolean) => void
}

interface ModalAuthTitle {
    children: ReactNode
    onClose: (() => void) | null
}

function ModalAuthTitle({ children, onClose }: ModalAuthTitle) {
    return (
        <DialogTitle
            sx={{
                m: 0,
                p: {
                    md: 2,
                    xs: theme.spacing(1, 2),
                },
            }}
        >
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                {children}
                {onClose ? (
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: theme.palette.grey[500],
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.dark, 0.1),
                                svg: {
                                    color: theme.palette.primary.dark,
                                },
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </Stack>
        </DialogTitle>
    )
}

function ModalAuth({ pIsShowModalAuth, pSetShowModalAuth }: IModalAuth) {
    const { t } = useTranslation()
    const isSmallScreen = useMediaQuery('(min-width:320px)')

    const handleCloseModalAuth = () => {
        pSetShowModalAuth(false)
    }

    return (
        <Dialog
            open={pIsShowModalAuth}
            sx={{
                '& .MuiPaper-root': {
                    width: 640,
                },
            }}
        >
            <ModalAuthTitle onClose={handleCloseModalAuth}>
                <Typography
                    component="h2"
                    variant={isSmallScreen ? 'body1' : 'h6'}
                    fontWeight={700}
                >
                    {t('auth.login_continue')}
                </Typography>
            </ModalAuthTitle>
            <DialogContent
                dividers
                sx={{
                    padding: 3,
                }}
            >
                <Stack gap={1.5}>
                    <Stack
                        component="figure"
                        alignItems={'center'}
                        sx={{
                            img: {
                                width: {
                                    md: 90,
                                    xs: 60,
                                },
                                height: {
                                    md: 90,
                                    xs: 60,
                                },
                                borderRadius: theme.spacing(0.75),
                            },
                        }}
                    >
                        <img src={LOGO} alt="" />
                    </Stack>
                    <Typography textAlign={'center'}>
                        {t('message.modal_text_auth')}
                    </Typography>
                    <Stack
                        gap={1}
                        width={'80%'}
                        margin={'auto'}
                        sx={{
                            button: {
                                padding: 0,
                                display: 'block',
                                fontWeight: 500,
                                borderRadius: theme.spacing(0.75),

                                a: {
                                    display: 'block',
                                    padding: theme.spacing(1.5, 2),
                                },
                            },
                        }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.primary.light,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                            onClick={handleCloseModalAuth}
                        >
                            <Link to={'/login'}>{t('auth.login')}</Link>
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                color: theme.palette.primary.main,
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: alpha(
                                        theme.palette.primary.dark,
                                        0.1
                                    ),
                                },
                            }}
                            onClick={handleCloseModalAuth}
                        >
                            <Link to={'/signup'}>{t('auth.create_account')}</Link>
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pIsShowModalAuth: state.common.isShowModalAuth,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalAuth: (isShow: boolean) => dispatch(setShowModalAuth(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAuth)
