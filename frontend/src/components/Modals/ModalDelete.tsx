import { AppDispatch, AppState } from '@/store'
import { setShowModalDelete } from '@/store/common'
import { Box, Modal, Typography, Button, Stack, alpha, Paper } from '@mui/material'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { red, yellow } from '@mui/material/colors'
import { theme } from '@/utils'
import { enqueueSnackbar } from 'notistack'
import { newsApi } from '@/api'
import { INews } from '@/models'
import { setNews } from '@/store/news'

export interface IModelDeleteProps {
    pShowModalDelete: boolean
    pNews: INews | null
    pSetNews: (news: INews | null) => void
    pSetShowModalDelete: (isShow: boolean) => void
}

function ModelDelete({
    pShowModalDelete,
    pNews,
    pSetNews,
    pSetShowModalDelete,
}: IModelDeleteProps) {
    const handleClose = () => {
        pSetShowModalDelete(false)
    }

    const handleDeleteNews = async () => {
        try {
            if (pNews?.id) {
                await newsApi.deleteNews(pNews?.id)
            }

            pSetNews(null)
            pSetShowModalDelete(false)
            enqueueSnackbar(`Delete article successfully.`, {
                variant: 'success',
            })
        } catch (error) {
            enqueueSnackbar('Delete failed.', {
                variant: 'error',
            })
        }
    }

    return (
        <Modal
            open={!!pShowModalDelete}
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
                    Are you sure you want to delete this article?
                </Typography>

                <Typography
                    id="modal-modal-description"
                    sx={{
                        mt: 2,
                        mb: 2,
                        a: {
                            color: yellow[700],
                        },
                        '&:hover': {
                            a: {
                                textDecoration: 'underline',
                            },
                        },
                    }}
                >
                    You cannot undo this action, perhaps you just want to{' '}
                    <Link to={'/'}>edit</Link> instead?
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
                        onClick={handleDeleteNews}
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
        pNews: state.news.news,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalDelete: (isShow: boolean) => dispatch(setShowModalDelete(isShow)),
        pSetNews: (news: INews | null) => dispatch(setNews(news)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelDelete)
