import { Box, Button, Stack, alpha, Grid } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { INewsForm, IOptionItem } from '@/models'
import { initNewsFormValues, selectStatus } from '@/data'
import { SIZE_4_MB, SIZE_10_MB } from '@/consts'
import { checkTypeImg, checkSizeImg, theme } from '@/utils'
import * as yup from 'yup'
import {
    EditorField,
    InputField,
    SelectField,
    AutoCompleteField,
    ImageLargeField,
} from '@/components/FormFields'
import { AppState, AppDispatch } from '@/store'
import { connect } from 'react-redux'
import { getAllHashTags } from '@/store/hashTag/thunkApi'
import { PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { enqueueSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTranslation } from 'react-i18next'

export interface ICreateNewsFormProps {
    onNewsSubmit: (values: INewsForm) => Promise<void>
    pUser: IUser | null
    pHashTagSelects: IOptionItem[]
    pInitValuesForm: INewsForm
    pGetAllHashTags: () => Promise<PayloadAction<unknown>>
}

function CreateNewsForm({
    pUser,
    pHashTagSelects,
    pGetAllHashTags,
    pInitValuesForm,
    onNewsSubmit,
}: ICreateNewsFormProps) {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const schema = yup.object().shape({
        title: yup.string().required('Please enter news name.'),
        sapo: yup.string(),
        readTimes: yup.number().min(1, 'At lease 1 min.'),
        thumbnailImage: yup
            .mixed<File>()
            .test(
                'is-nullable-thumbnail',
                'Please choose news thumbnail image.',
                function (file) {
                    if (pInitValuesForm.thumbnailImage) return true
                    const { thumbnailImage, coverImage } = this.parent
                    if (!((thumbnailImage && coverImage) || file?.name)) return
                    if (file?.name) return true
                }
            )
            .test('type-img', 'Invalid type image.', (file) => {
                if (pInitValuesForm.thumbnailImage) return true
                return checkTypeImg(file)
            })
            .test('size-img', 'Maximum 4MB.', (file) => {
                if (pInitValuesForm.thumbnailImage) return true
                return checkSizeImg(file, SIZE_4_MB)
            }),
        coverImage: yup
            .mixed<File>()
            .test(
                'is-nullable-cover',
                'Please choose news cover image.',
                function (file) {
                    if (pInitValuesForm.coverImage) return true
                    const { thumbnailImage, coverImage } = this.parent
                    if (!((thumbnailImage && coverImage) || file?.name)) return
                    if (file?.name) return true
                }
            )
            .test('type-img', 'Invalid type image.', (file) => {
                if (pInitValuesForm.coverImage) return true
                return checkTypeImg(file)
            })
            .test('size-img', 'Maximum 10MB.', (file) => {
                if (pInitValuesForm.coverImage) return true
                return checkSizeImg(file, SIZE_10_MB)
            }),
        content: yup.string().required('Please enter news content.'),
        hashTagOptionIds: yup.array(),
    })

    useEffect(() => {
        if (pUser) {
            document.title = `${
                pInitValuesForm?.id
                    ? t('title_document.update_news')
                    : t('title_document.create_news')
            } - ${t('title_document.news_community')}`
            pGetAllHashTags()
        } else {
            navigate('/login')
        }
    }, [])

    const form = useForm<INewsForm>({
        defaultValues: initNewsFormValues,
        resolver: yupResolver(schema),
    })

    const {
        formState: { isSubmitting },
        handleSubmit,
        reset,
        setValue,
    } = form

    useEffect(() => {
        setValue('title', pInitValuesForm.title)
        setValue('sapo', pInitValuesForm.sapo)
        setValue('content', pInitValuesForm.content)
        setValue('readTimes', pInitValuesForm.readTimes)
        setValue('hashTags', pInitValuesForm.hashTags)
        setValue('status', pInitValuesForm.status)
        setValue('coverImage', pInitValuesForm.coverImage)
        setValue('thumbnailImage', pInitValuesForm.thumbnailImage)
        setValue('hashTagOptionIds', pInitValuesForm.hashTagOptionIds)
    }, [pInitValuesForm, setValue])

    const handleNewsSubmit = async (values: INewsForm) => {
        try {
            await onNewsSubmit({ ...values, id: pInitValuesForm?.id })
            reset()
        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: 'error',
            })
        }
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleNewsSubmit)}>
            <Box marginBottom={3}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        md
                        sx={{
                            width: '100%',
                        }}
                    >
                        <InputField
                            form={form}
                            name={'title'}
                            label={t('input.title')}
                            disabled={isSubmitting}
                            placeholder={t('placeholder.title') as string}
                        />
                        <InputField
                            form={form}
                            name={'sapo'}
                            label={t('input.sapo')}
                            disabled={isSubmitting}
                            placeholder={t('placeholder.sapo') as string}
                            minRows={2}
                            multiline
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                gap: {
                                    md: 2,
                                    xs: 1,
                                },
                            }}
                        >
                            <InputField
                                type="number"
                                form={form}
                                name={'readTimes'}
                                label={t('input.read_times')}
                                disabled={isSubmitting}
                            />
                            <SelectField
                                type="number"
                                form={form}
                                name={'status'}
                                label={t('input.status')}
                                disabled={isSubmitting}
                                selects={selectStatus}
                            />
                        </Box>
                        <AutoCompleteField
                            form={form}
                            name={'hashTagOptionIds'}
                            label={t('input.tags')}
                            disabled={isSubmitting}
                            placeholder={t('placeholder.choose_tags') as string}
                            list={pHashTagSelects || []}
                        />
                    </Grid>

                    <Grid
                        item
                        sx={{
                            width: {
                                md: 350,
                                xs: '100%',
                            },
                        }}
                    >
                        <ImageLargeField
                            form={form}
                            name={'thumbnailImage'}
                            label={t('input.thumbnail_image')}
                            disabled={isSubmitting}
                            initValue={pInitValuesForm.thumbnailImage}
                            placeholder={'Enter thumbnail image'}
                        />
                        <ImageLargeField
                            form={form}
                            name={'coverImage'}
                            label={t('input.cover_image')}
                            disabled={isSubmitting}
                            initValue={pInitValuesForm.coverImage}
                            placeholder={'Enter cover image'}
                        />
                    </Grid>
                </Grid>
                <EditorField
                    form={form}
                    name={'content'}
                    label={t('input.content')}
                    disabled={isSubmitting}
                    placeholder={t('placeholder.typing_content') as string}
                />
            </Box>

            <Stack
                direction="row"
                gap={{
                    md: 2,
                    xs: 1,
                }}
                sx={{
                    button: {
                        fontWeight: 500,
                        padding: theme.spacing(1.5),
                    },
                }}
            >
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                        color: theme.palette.secondary.main,
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.secondary.main, 0.5),
                        },
                    }}
                    disabled={isSubmitting}
                    onClick={handleCancel}
                >
                    {t('button.cancel')}
                </Button>
                <LoadingButton
                    type="submit"
                    fullWidth
                    loading={isSubmitting}
                    loadingPosition="start"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    {pInitValuesForm?.id
                        ? t('button.update_news')
                        : t('button.create_news')}
                </LoadingButton>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
        pHashTagSelects: state.hashTag.hashTagSelects,
        pInitValuesForm: state.news.initValuesForm,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetAllHashTags: () => dispatch(getAllHashTags()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewsForm)
