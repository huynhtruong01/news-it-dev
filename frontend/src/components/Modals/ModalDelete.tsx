import { AppDispatch, AppState } from '@/store'
import { setShowModalDelete } from '@/store/common'
import { Box, Modal, Typography, Button, Stack, alpha, Paper } from '@mui/material'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { red, yellow } from '@mui/material/colors'
import { theme } from '@/utils'
import { enqueueSnackbar } from 'notistack'
import { newsApi } from '@/api'
import { INews, INewsForm, IOptionItem, IStatus } from '@/models'
import { setInitValueForm, setNews } from '@/store/news'
import { deleteNewsUser } from '@/store/user'
import { useTranslation } from 'react-i18next'

export interface IModelDeleteProps {
    pShowModalDelete: boolean
    pNews: INews | null
    pSetNews: (news: INews | null) => void
    pSetShowModalDelete: (isShow: boolean) => void
    pDeleteNews: (id: number) => void
    pSetInitValuesNewsForm: (news: INewsForm) => void
}

function ModelDelete({
    pShowModalDelete,
    pNews,
    pSetNews,
    pSetShowModalDelete,
    pDeleteNews,
    pSetInitValuesNewsForm,
}: IModelDeleteProps) {
    const { t } = useTranslation()

    const handleClose = () => {
        pSetShowModalDelete(false)
    }

    const handleDeleteNews = async () => {
        try {
            if (pNews?.id) {
                pDeleteNews(pNews.id)
                pSetShowModalDelete(false)
                pSetNews(null)
                await newsApi.deleteNews(pNews?.id)
            }

            enqueueSnackbar(`${t('message.delete_success')}`, {
                variant: 'success',
            })
        } catch (error) {
            enqueueSnackbar('Delete failed.', {
                variant: 'error',
            })
        }
    }

    const handleSetInitValuesNews = () => {
        if (pNews) {
            const hashTagOptionIds = pNews.hashTags?.map(
                (item) =>
                    ({
                        id: item.id,
                        name: item.name,
                    } as IOptionItem)
            )
            const newNewsValues: INewsForm = {
                id: pNews.id,
                title: pNews.title,
                sapo: pNews.sapo,
                thumbnailImage: pNews.thumbnailImage,
                coverImage: pNews.coverImage,
                content: pNews.content,
                status: pNews.status as IStatus,
                readTimes: pNews.readTimes,
                hashTags: pNews.hashTags,
                hashTagOptionIds,
            }
            pSetInitValuesNewsForm(newNewsValues)
            handleClose()
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
                    width: {
                        md: 400,
                        xs: '85%',
                    },
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
                        mt: 1,
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
                    <Link to={`/update-news`} onClick={handleSetInitValuesNews}>
                        edit
                    </Link>{' '}
                    instead?
                </Typography>

                <Stack direction="row" gap={1} justifyContent="flex-end">
                    <Button
                        variant="contained"
                        sx={{
                            flex: {
                                md: 'none',
                                xs: 1,
                            },
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
                            flex: {
                                md: 'none',
                                xs: 1,
                            },
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
        pDeleteNews: (id: number) => dispatch(deleteNewsUser(id)),
        pSetInitValuesNewsForm: (values: INewsForm) => dispatch(setInitValueForm(values)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelDelete)
