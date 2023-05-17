import { AppDispatch, AppState } from '@/store'
import { setShowModalDelete } from '@/store/common'
import { Box, Modal, Typography, Button, Stack, alpha } from '@mui/material'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { red } from '@mui/material/colors'
import { theme } from '@/utils'

export interface IModelDeleteProps {
    pShowModalDelete: boolean
    pSetShowModalDelete: (isShow: boolean) => void
}

function ModelDelete({ pShowModalDelete, pSetShowModalDelete }: IModelDeleteProps) {
    const handleClose = () => {
        pSetShowModalDelete(false)
    }

    return (
        <Modal
            open={pShowModalDelete}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    fontWeight={700}
                >
                    Are you sure you want to delete this article?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                    You cannot undo this action, perhaps you just want to{' '}
                    <Link to={'/'}>edit</Link> instead?
                </Typography>

                <Stack direction="row" gap={1}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                            color: theme.palette.secondary.main,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.secondary.main, 0.5),
                            },
                        }}
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
        pShowModalDelete: state.common.isShowModalDelete,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalDelete: (isShow: boolean) => dispatch(setShowModalDelete(isShow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelDelete)
