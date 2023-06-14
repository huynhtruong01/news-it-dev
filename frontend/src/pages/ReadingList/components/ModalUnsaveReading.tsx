import { newsApi } from '@/api'
import { ModalAction, ModalIconDelete } from '@/components/Modals/components'
import { INews } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { setShowModalUnSaveReading } from '@/store/common'
import { unsaveUserFiltersNews } from '@/store/user'
import { theme } from '@/utils'
import { Box, Modal, Paper, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface IModalUnsaveReadingProps {
    article: INews
    setArticleUnSave?: Dispatch<SetStateAction<INews | null>>
    pIsShowModalUnSaveReading: boolean
    pSetShowModalUnSaveReading: (isShow: boolean) => void
    pUnSaveNews: (data: INews) => void
}

export function ModalUnsaveReading({
    article,
    setArticleUnSave,
    pIsShowModalUnSaveReading,
    pSetShowModalUnSaveReading,
    pUnSaveNews,
}: IModalUnsaveReadingProps) {
    const { t } = useTranslation()

    const handleClose = () => {
        pSetShowModalUnSaveReading(false)
    }

    const handleUnSaveReading = async () => {
        try {
            pUnSaveNews(article)
            handleClose()
            await newsApi.unsaveNews(article.id)
            setArticleUnSave?.(null)
        } catch (error) {
            enqueueSnackbar('Delete failed', {
                variant: 'error',
            })
        }
    }

    return (
        <Modal
            open={!!pIsShowModalUnSaveReading}
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
                    {t('modal.unsave_reading')}
                </Typography>

                <ModalAction onClose={handleClose} onDelete={handleUnSaveReading} />
            </Box>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pIsShowModalUnSaveReading: state.common.isShowModalUnSaveReading,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetShowModalUnSaveReading: (isShow: boolean) =>
            dispatch(setShowModalUnSaveReading(isShow)),
        pUnSaveNews: (data: INews) => dispatch(unsaveUserFiltersNews(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUnsaveReading)
