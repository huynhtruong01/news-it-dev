import { authApi } from '@/api'
import { ModalAction, ModalIconDelete } from '@/components/Modals/components'
import { AppDispatch, AppState } from '@/store'
import { setShowModalDeleteAccount } from '@/store/common'
import { signout } from '@/store/user'
import { theme } from '@/utils'
import { Box, Modal, Paper, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleClose = () => {
        pSetShowModalDeleteAccount(false)
    }

    const handleDeleteAccount = async () => {
        try {
            setLoading(true)
            await authApi.deleteMe()

            pResetValueRedux()
            enqueueSnackbar(t('message.delete_account_success'), {
                variant: 'success',
            })
            handleClose()
            navigate('/')
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }

        setLoading(false)
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
                    width: {
                        md: 400,
                        xs: '95%',
                    },
                    padding: {
                        md: 3,
                        xs: 2,
                    },
                }}
            >
                <ModalIconDelete />

                <Typography
                    variant="h6"
                    component="h2"
                    fontWeight={700}
                    sx={{
                        padding: {
                            md: theme.spacing(0, 4),
                            xs: theme.spacing(0, 1),
                        },
                        textAlign: 'center',
                        lineHeight: 1.5,
                        marginBottom: 3,
                    }}
                >
                    {t('modal.delete_account')}
                </Typography>

                <ModalAction
                    onClose={handleClose}
                    onDelete={handleDeleteAccount}
                    isCallApi
                    loading={loading}
                />
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
