import { authApi } from '@/api'
import { AppDispatch, AppState } from '@/store'
import { setShowModalDeleteAccount } from '@/store/common'
import { signout } from '@/store/user'
import { theme } from '@/utils'
import { Box, Button, Modal, Paper, Stack, Typography, alpha } from '@mui/material'
import { red } from '@mui/material/colors'
import { enqueueSnackbar } from 'notistack'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export interface ISettingsModalDeleteProps {
    pShowModalDeleteAccount: boolean
    pSetShowModalDeleteAccount: (isShow: boolean) => void
    pResetValueRedux: () => void
}

function SettingsModalDelete({
    pShowModalDeleteAccount,
    pSetShowModalDeleteAccount,
    pResetValueRedux,
}: ISettingsModalDeleteProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const handleClose = () => {
        pSetShowModalDeleteAccount(false)
    }

    const handleDeleteAccount = async () => {
        try {
            pResetValueRedux()
            enqueueSnackbar(t('message.delete_account_success'), {
                variant: 'success',
            })
            handleClose()
            navigate('/')

            await authApi.deleteMe()
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
    }

    return (
        <Modal
            open={!!pShowModalDeleteAccount}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                component={Paper}
                elevation={1}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    padding: 3,
                }}
            >
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    fontWeight={700}
                >
                    {t('modal.delete_account')}
                </Typography>

                <Stack direction="row" gap={1} justifyContent="flex-end" marginTop={2}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                            color: theme.palette.secondary.main,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.secondary.main, 0.3),
                            },
                        }}
                        onClick={handleClose}
                    >
                        {t('button.cancel')}
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: red[500],
                            color: theme.palette.primary.contrastText,
                            '&:hover': {
                                backgroundColor: red[700],
                            },
                        }}
                        onClick={handleDeleteAccount}
                    >
                        {t('button.delete')}
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pShowModalDeleteAccount: state.common.isShowModalDeleteAccount,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalDeleteAccount: (isShow: boolean) =>
            dispatch(setShowModalDeleteAccount(isShow)),
        pResetValueRedux: () => dispatch(signout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModalDelete)
