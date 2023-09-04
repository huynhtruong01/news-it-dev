import { notifyApi } from '@/api'
import { ModalAction, ModalIconDelete } from '@/components/Modals/components'
import { AppDispatch, AppState } from '@/store'
import { setShowModalDeleteAllNotify } from '@/store/common'
import { resetNotifies } from '@/store/notify'
import { theme } from '@/utils'
import { Box, Modal, Paper, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface IModalDeleteAllNotifyProps {
    hasNotifies: boolean
    pIsShowModalDeleteAllNotify: boolean
    pSetShowModalDeleteAllNotify: (isShow: boolean) => void
    pSetAllNotify: () => void
}

export function ModalDeleteAllNotify({
    hasNotifies,
    pIsShowModalDeleteAllNotify,
    pSetShowModalDeleteAllNotify,
    pSetAllNotify,
}: IModalDeleteAllNotifyProps) {
    const { t } = useTranslation()

    const handleClose = () => {
        pSetShowModalDeleteAllNotify(false)
    }

    const handleDeleteNotify = async () => {
        try {
            pSetAllNotify()
            handleClose()
            await notifyApi.deleteAllNotify()
        } catch (error) {
            enqueueSnackbar('Delete notify failed.', {
                variant: 'error',
            })
        }
    }

    return (
        <Modal
            open={!!pIsShowModalDeleteAllNotify}
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
                    marginBottom={2.5}
                    sx={{
                        padding: {
                            md: theme.spacing(0, 4),
                            xs: theme.spacing(0, 1),
                        },
                        textAlign: 'center',
                        lineHeight: 1.5,
                        color: theme.palette.secondary.dark,
                    }}
                >
                    {t('modal.delete_all_notify')}
                </Typography>

                {/* actions */}
                <ModalAction
                    onClose={handleClose}
                    onDelete={handleDeleteNotify}
                    text={'button.delete_all'}
                    disabled={!hasNotifies}
                />
            </Box>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pIsShowModalDeleteAllNotify: state.common.isShowModalDeleteAllNotify,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalDeleteAllNotify: (isShow: boolean) =>
            dispatch(setShowModalDeleteAllNotify(isShow)),
        pSetAllNotify: () => dispatch(resetNotifies()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteAllNotify)
