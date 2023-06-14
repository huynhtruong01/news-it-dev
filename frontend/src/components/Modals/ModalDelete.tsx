import { newsApi } from '@/api'
import { ModalAction, ModalIconDelete } from '@/components/Modals/components'
import { INews, INewsForm, IOptionItem, IStatus } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalDelete } from '@/store/common'
import { setInitValueForm, setNews } from '@/store/news'
import { deleteNewsUser } from '@/store/user'
import { theme } from '@/utils'
import { Box, Modal, Paper, Typography, alpha } from '@mui/material'
import { yellow } from '@mui/material/colors'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
    const [loading, setLoading] = useState<boolean>(false)

    const handleClose = () => {
        pSetShowModalDelete(false)
    }

    const handleDeleteNews = async () => {
        try {
            if (pNews?.id) {
                setLoading(true)
                await newsApi.deleteNews(pNews?.id)
                setLoading(false)
                pDeleteNews(pNews.id)
                pSetShowModalDelete(false)
                pSetNews(null)
            }

            enqueueSnackbar(`${t('message.delete_success')}`, {
                variant: 'success',
            })
        } catch (error) {
            enqueueSnackbar('Delete failed', {
                variant: 'error',
            })
        }
        setLoading(false)
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
            sx={{
                padding: 1,
            }}
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
                    marginBottom={1.5}
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
                    {t('modal.delete_news')}
                </Typography>

                <Typography
                    sx={{
                        padding: theme.spacing(0, 4),
                        textAlign: 'center',
                        fontSize: theme.typography.body2,
                        color: alpha(theme.palette.secondary.dark, 0.7),
                        marginBottom: 3,
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
                    {t('modal.news_undo')}{' '}
                    <Link to={`/update-news`} onClick={handleSetInitValuesNews}>
                        {t('button.edit')}
                    </Link>{' '}
                    {t('modal.instead')}?
                </Typography>

                <ModalAction
                    onClose={handleClose}
                    onDelete={handleDeleteNews}
                    loading={loading}
                    isCallApi
                />
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
