import {
    AutoCompleteField,
    EditorField,
    ImageLargeField,
    InputField,
    SelectField,
} from '@/components/FormFields'
import { SIZE_10_MB, SIZE_4_MB } from '@/consts'
import { initNewsFormValues, selectStatus } from '@/data'
import { INewsForm, IOptionItem, IUser } from '@/models'
import { AppDispatch, AppState } from '@/store'
import { getAllHashTags } from '@/store/hashTag/thunkApi'
import { checkSizeImg, checkTypeImg, theme } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Grid, Stack, alpha } from '@mui/material'
import { PayloadAction } from '@reduxjs/toolkit'
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

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
        title: yup.string().required(t('error_input.error_name_news') as string),
        sapo: yup.string(),
        thumbnailImage: yup
            .mixed<File>()
            .test(
                'is-nullable-thumbnail',
                `${t('error_input.error_thumbnail_image') as string}`,
                function (file) {
                    if (pInitValuesForm.thumbnailImage) return true
                    const { thumbnailImage, coverImage } = this.parent
                    if (!((thumbnailImage && coverImage) || file?.name)) return
                    if (file?.name) return true
                }
            )
            .test('type-img', t('error_input.type_image') as string, (file) => {
                if (pInitValuesForm.thumbnailImage) return true
                return checkTypeImg(file as File)
            })
            .test('size-img', t('error_input.maximum_4') as string, (file) => {
                if (pInitValuesForm.thumbnailImage) return true
                return checkSizeImg(file as File, SIZE_4_MB)
            }),
        coverImage: yup
            .mixed<File>()
            .test(
                'is-nullable-cover',
                `${t('error_input.error_cover_image') as string}`,
                function (file) {
                    if (pInitValuesForm.coverImage) return true
                    const { thumbnailImage, coverImage } = this.parent
                    if (!((thumbnailImage && coverImage) || file?.name)) return
                    if (file?.name) return true
                }
            )
            .test('type-img', t('error_input.type_image') as string, (file) => {
                if (pInitValuesForm.coverImage) return true
                return checkTypeImg(file as File)
            })
            .test('size-img', t('error_input.maximum_10') as string, (file) => {
                if (pInitValuesForm.coverImage) return true
                return checkSizeImg(file as File, SIZE_10_MB)
            }),
        content: yup.string().required(t('error_input.error_content_news') as string),
        hashTagOptionIds: yup
            .array()
            .max(4, t('error_input.maximum_4_hash_tag') as string),
    })

    useEffect(() => {
        if (pUser) {
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
            enqueueSnackbar((error as Error).message, {
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
                        <InputField<INewsForm>
                            form={form}
                            name={'title'}
                            label={t('input.title')}
                            disabled={isSubmitting}
                            placeholder={t('placeholder.title') as string}
                            required
                        />
                        <InputField<INewsForm>
                            form={form}
                            name={'sapo'}
                            label={t('input.sapo')}
                            disabled={isSubmitting}
                            placeholder={t('placeholder.sapo') as string}
                            minRows={2}
                            multiline
                        />
                        <SelectField<INewsForm>
                            form={form}
                            name={'status'}
                            label={t('input.status')}
                            disabled={isSubmitting}
                            selects={selectStatus}
                        />
                        <AutoCompleteField<INewsForm>
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
                        <ImageLargeField<INewsForm>
                            form={form}
                            name={'thumbnailImage'}
                            label={t('input.thumbnail_image')}
                            disabled={isSubmitting}
                            initValue={pInitValuesForm?.thumbnailImage as string}
                            placeholder={'Enter thumbnail image'}
                            required
                        />
                        <ImageLargeField<INewsForm>
                            form={form}
                            name={'coverImage'}
                            label={t('input.cover_image')}
                            disabled={isSubmitting}
                            initValue={pInitValuesForm?.coverImage as string}
                            placeholder={'Enter cover image'}
                            required
                        />
                    </Grid>
                </Grid>
                <EditorField<INewsForm>
                    form={form}
                    name={'content'}
                    label={t('input.content')}
                    disabled={isSubmitting}
                    placeholder={t('placeholder.typing_content') as string}
                    required
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
                        backgroundColor: 'transparent',
                        color: theme.palette.secondary.main,
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
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
                        border: '1px solid transparent',
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
