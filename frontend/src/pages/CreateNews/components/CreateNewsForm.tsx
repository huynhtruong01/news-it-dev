import { Box, Button, Stack, alpha } from '@mui/material'
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

export interface ICreateNewsFormProps {
    onNewsSubmit: (values: INewsForm) => Promise<void>
    pHashTagSelects: IOptionItem[]
    pInitValuesForm: INewsForm
    pGetAllHashTags: () => Promise<PayloadAction<unknown>>
}

function CreateNewsForm({
    pHashTagSelects,
    pGetAllHashTags,
    pInitValuesForm,
}: ICreateNewsFormProps) {
    const navigate = useNavigate()

    const schema = yup.object().shape({
        title: yup.string().required('Please enter name.'),
        sapo: yup.string(),
        readTimes: yup.number(),
        thumbnailImage: yup
            .mixed<File>()
            .test(
                'is-nullable-thumbnail',
                'Please choose thumbnail image.',
                function (file) {
                    const { thumbnailImage, coverImage } = this.parent
                    if (!((thumbnailImage && coverImage) || file?.name)) return
                    if (file?.name) return true
                }
            )
            .test('type-img', 'Invalid type image.', (file) => checkTypeImg(file))
            .test('size-img', 'Maximum 4MB.', (file) => checkSizeImg(file, SIZE_4_MB)),
        coverImage: yup
            .mixed<File>()
            .test('is-nullable-cover', 'Please choose cover image.', function (file) {
                const { thumbnailImage, coverImage } = this.parent
                if (!((thumbnailImage && coverImage) || file?.name)) return
                if (file?.name) return true
            })
            .test('type-img', 'Invalid type image.', (file) => checkTypeImg(file))
            .test('size-img', 'Maximum 10MB.', (file) => checkSizeImg(file, SIZE_10_MB)),
        content: yup.string().required('Please enter news content.'),
    })

    useEffect(() => {
        document.title = 'Create News - DEV Community'
        pGetAllHashTags()
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
    }, [pInitValuesForm])

    const handleNewsSubmit = async (values: INewsForm) => {
        try {
            await onNewsSubmit(values)

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
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 350px',
                        gap: 3,
                    }}
                >
                    <Box>
                        <InputField
                            form={form}
                            name={'title'}
                            label={'Title'}
                            disabled={isSubmitting}
                            placeholder={'title news...'}
                        />
                        <InputField
                            form={form}
                            name={'sapo'}
                            label={'Sapo'}
                            disabled={isSubmitting}
                            placeholder={'sub description news...'}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                            }}
                        >
                            <InputField
                                type="number"
                                form={form}
                                name={'readTimes'}
                                label={'Read Times'}
                                disabled={isSubmitting}
                            />
                            <SelectField
                                type="number"
                                form={form}
                                name={'status'}
                                label={'Status'}
                                disabled={isSubmitting}
                                selects={selectStatus}
                            />
                        </Box>
                        <AutoCompleteField
                            form={form}
                            name={'hashTagOptionIds'}
                            label={'Tags'}
                            disabled={isSubmitting}
                            placeholder={'choose tags...'}
                            list={pHashTagSelects || []}
                        />
                    </Box>

                    <Box>
                        <ImageLargeField
                            form={form}
                            name={'thumbnailImage'}
                            label={'Thumbnail Image'}
                            disabled={isSubmitting}
                            initValue={initNewsFormValues.thumbnailImage}
                            placeholder={'Enter thumbnail image'}
                        />
                        <ImageLargeField
                            form={form}
                            name={'coverImage'}
                            label={'Cover Image'}
                            disabled={isSubmitting}
                            initValue={initNewsFormValues.coverImage}
                            placeholder={'Enter cover image'}
                        />
                    </Box>
                </Box>
                <EditorField
                    form={form}
                    name={'content'}
                    label={'Content'}
                    disabled={isSubmitting}
                    placeholder={'typing content...'}
                />
            </Box>

            <Stack
                direction="row"
                gap={2}
                sx={{
                    button: {
                        fontWeight: 500,
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
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                    disabled={isSubmitting}
                >
                    Create News
                </Button>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
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
