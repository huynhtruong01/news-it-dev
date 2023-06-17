import { newsApi } from '@/api'
import { ModalIconDelete } from '@/components/Modals/components'
import { initNewsFormValues } from '@/data'
import { Status } from '@/enums'
import { INewsForm } from '@/models'
import { generateNewValues } from '@/pages/CreateNews'
import { AppDispatch, AppState } from '@/store'
import { setShowModalPublicNews } from '@/store/common'
import { setInitValueForm } from '@/store/news'
import { publicNews } from '@/store/user'
import { theme } from '@/utils'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import { Box, Button, Modal, Paper, Stack, Typography, alpha } from '@mui/material'
import { red } from '@mui/material/colors'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'

export interface IModalPublicNewsProps {
    pNews: INewsForm
    pIsShowModalPublicNews: boolean
    pSetShowModalPublicNews: (isShow: boolean) => void
    pSetInitValuesNewsForm: (values: INewsForm) => void
    pPublicNews: (id: number) => void
}

export function ModalPublicNews({
    pNews,
    pIsShowModalPublicNews,
    pSetShowModalPublicNews,
    pSetInitValuesNewsForm,
    pPublicNews,
}: IModalPublicNewsProps) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)

    const handleClose = () => {
        pSetShowModalPublicNews(false)
        pSetInitValuesNewsForm(initNewsFormValues)
    }

    const handlePublicNews = async () => {
        try {
            setLoading(true)
            const { newValues, ids } = generateNewValues(pNews)
            await newsApi.updateNews({
                ...newValues,
                hashTagIds: ids,
                status: Status.PUBLIC,
            })
            if (newValues.id) {
                pPublicNews(newValues.id)
            }
            handleClose()

            enqueueSnackbar(t('message.public_news'), {
                variant: 'success',
            })
        } catch (error) {
            enqueueSnackbar((error as Error).message, {
                variant: 'error',
            })
        }
        setLoading(false)
    }

    return (
        <Modal
            open={!!pIsShowModalPublicNews}
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
                    {t('modal.public_news')}
                </Typography>

                <Stack
                    direction="row"
                    gap={1}
                    justifyContent="center"
                    sx={{
                        button: {
                            padding: 1.5,
                            fontWeight: 500,
                        },
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            color: theme.palette.secondary.main,
                            border: `1px solid ${alpha(
                                theme.palette.secondary.main,
                                0.3
                            )}`,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            },
                        }}
                        onClick={handleClose}
                        disabled={loading}
                    >
                        {t('button.cancel')}
                    </Button>

                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        disabled={loading}
                        sx={{
                            flex: 1,
                            backgroundColor: red[500],
                            color: theme.palette.primary.contrastText,
                            border: '1px solid transparent',
                            '&:hover': {
                                backgroundColor: red[700],
                            },
                        }}
                        onClick={handlePublicNews}
                    >
                        {t('button.public')}
                    </LoadingButton>
                </Stack>
            </Box>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pIsShowModalPublicNews: state.common.isShowModalPublicNews,
        pNews: state.news.initValuesForm,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pSetInitValuesNewsForm: (values: INewsForm) => dispatch(setInitValueForm(values)),
        pSetShowModalPublicNews: (isShow: boolean) =>
            dispatch(setShowModalPublicNews(isShow)),
        pPublicNews: (id: number) => dispatch(publicNews(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPublicNews)
