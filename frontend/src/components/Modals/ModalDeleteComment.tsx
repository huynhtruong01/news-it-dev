import { commentApi } from '@/api'
import { IComment } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setComment } from '@/store/comment'
import { setShowModalDeleteComment } from '@/store/common'
import { theme } from '@/utils'
import { Box, Button, Modal, Paper, Stack, Typography, alpha } from '@mui/material'
import { red } from '@mui/material/colors'
import { enqueueSnackbar } from 'notistack'
import { connect } from 'react-redux'

export interface IModelDeleteCommentProps {
    pShowModalDeleteComment: boolean
    pComment: IComment | null
    pSetComment: (comment: IComment | null) => void
    pSetShowModalDeleteComment: (isShow: boolean) => void
    pDeleteComment: (comment: IComment) => void
}

function ModelDeleteComment({
    pShowModalDeleteComment,
    pComment,
    pSetComment,
    pSetShowModalDeleteComment,
}: IModelDeleteCommentProps) {
    const handleClose = () => {
        pSetShowModalDeleteComment(false)
    }

    const handleDeleteComment = async () => {
        try {
            if (pComment?.id) {
                pSetComment(null)
                pSetShowModalDeleteComment(false)
                // pDeleteComment(pComment)

                await commentApi.deleteComment(pComment.id)
            }
        } catch (error) {
            enqueueSnackbar('Delete comment failed.', {
                variant: 'error',
            })
        }
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
                    Are you sure you want to delete this comment?
                </Typography>

                <Stack direction="row" gap={1} justifyContent="flex-end">
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                            color: theme.palette.secondary.main,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.secondary.main, 0.5),
                            },
                        }}
                        onClick={handleClose}
                    >
                        Cancel
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
                        onClick={handleDeleteComment}
                    >
                        Delete
                    </Button>
                </Stack>
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
        // pDeleteComment: (comment: IComment) => dispatch(deleteComment(comment)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelDeleteComment)
