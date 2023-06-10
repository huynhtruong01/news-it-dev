import { commentApi } from '@/api'
import { ModalAction, ModalIconDelete } from '@/components/Modals/components'
import { IComment } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setComment } from '@/store/comment'
import { setShowModalDeleteComment } from '@/store/common'
import { decreaseNumComment } from '@/store/news'
import { theme } from '@/utils'
import { Box, Modal, Paper, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface IModelDeleteCommentProps {
    pShowModalDeleteComment: boolean
    pComment: IComment | null
    pSetComment: (comment: IComment | null) => void
    pSetShowModalDeleteComment: (isShow: boolean) => void
    pSetNumNewsComments: () => void
}

function ModelDeleteComment({
    pShowModalDeleteComment,
    pComment,
    pSetComment,
    pSetShowModalDeleteComment,
    pSetNumNewsComments,
}: IModelDeleteCommentProps) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)

    const handleClose = () => {
        pSetShowModalDeleteComment(false)
    }

    const handleDeleteComment = async () => {
        try {
            if (pComment?.id) {
                setLoading(true)
                await commentApi.deleteComment(pComment.id)

                pSetComment(null)
                pSetShowModalDeleteComment(false)
                pSetNumNewsComments()
            }
        } catch (error) {
            enqueueSnackbar('Delete comment failed.', {
                variant: 'error',
            })
        }
        setLoading(false)
    }

    return (
        <Modal
            open={!!pShowModalDeleteComment}
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
                    {t('modal.delete_comment')}
                </Typography>

                {/* actions */}
                <ModalAction
                    onClose={handleClose}
                    onDelete={handleDeleteComment}
                    isCallApi
                    loading={loading}
                />
            </Box>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pShowModalDeleteComment: state.common.isShowModalDeleteComment,
        pComment: state.comment.comment,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalDeleteComment: (isShow: boolean) =>
            dispatch(setShowModalDeleteComment(isShow)),
        pSetComment: (comment: IComment | null) => dispatch(setComment(comment)),
        pSetNumNewsComments: () => dispatch(decreaseNumComment()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelDeleteComment)
