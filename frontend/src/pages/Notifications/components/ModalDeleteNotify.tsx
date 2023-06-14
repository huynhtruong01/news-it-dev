import { notifyApi } from '@/api'
import { ModalAction, ModalIconDelete } from '@/components/Modals/components'
import { INotify, INotifyUpdateRead, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalDeleteNotify } from '@/store/common'
import { deleteNotify, setNotify } from '@/store/notify'
import { theme } from '@/utils'
import { Box, Modal, Paper, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface IModalDeleteNotifyProps {
    pUser: IUser | null
    pNotify: INotify | null
    pIsShowModalDeleteNotify: boolean
    pSetShowModalDeleteNotify: (isShow: boolean) => void
    pDeleteNotify: (data: INotifyUpdateRead) => void
    pSetNotify: (data: INotify | null) => void
}

export function ModalDeleteNotify({
    pUser,
    pNotify,
    pSetNotify,
    pIsShowModalDeleteNotify,
    pSetShowModalDeleteNotify,
    pDeleteNotify,
}: IModalDeleteNotifyProps) {
    const { t } = useTranslation()

    const handleClose = () => {
        pSetShowModalDeleteNotify(false)
    }

    const handleDeleteNotify = async () => {
        try {
            if (pNotify) {
                pDeleteNotify({ notify: pNotify, userId: pUser?.id as number })
                handleClose()
                await notifyApi.deleteNotify(pNotify.id)
                pSetNotify(null)
            }
        } catch (error) {
            enqueueSnackbar('Delete notify failed.', {
                variant: 'error',
            })
        }
    }

    return (
        <Modal
            open={!!pIsShowModalDeleteNotify}
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
                    {t('modal.delete_notify')}
                </Typography>

                {/* actions */}
                <ModalAction
                    onClose={handleClose}
                    onDelete={handleDeleteNotify}
                    isCallApi
                />
            </Box>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pIsShowModalDeleteNotify: state.common.isShowModalDeleteNotify,
        pUser: state.user.user,
        pNotify: state.notify.notify,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalDeleteNotify: (isShow: boolean) =>
            dispatch(setShowModalDeleteNotify(isShow)),
        pDeleteNotify: (data: INotifyUpdateRead) => dispatch(deleteNotify(data)),
        pSetNotify: (data: INotify | null) => dispatch(setNotify(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteNotify)
