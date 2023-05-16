import { Box, Button, Stack } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { INewsForm, IOptionItem } from '@/models'
import { initNewsFormValues, selectStatus } from '@/data'
import { SIZE_4_MB, SIZE_10_MB } from '@/consts'
import { checkTypeImg, checkSizeImg } from '@/utils'
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

export interface ICreateNewsFormProps {
    pHashTagSelects: IOptionItem[]
    pGetAllHashTags: () => Promise<PayloadAction<unknown>>
}

function CreateNewsForm({ pHashTagSelects, pGetAllHashTags }: ICreateNewsFormProps) {
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

    const handleNewsSubmit = (values: INewsForm) => {
        try {
            console.log(values)
        } catch (error) {
            throw new Error(error as string)
        }
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
                            placeholder={'Enter title'}
                        />
                        <InputField
                            form={form}
                            name={'sapo'}
                            label={'Sapo'}
                            disabled={isSubmitting}
                            placeholder={'Enter sapo'}
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
                            placeholder={'Choose tags'}
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
                    placeholder={'Enter content'}
                />
            </Box>

            <Stack direction="row" gap={2}>
                <Button variant="contained" fullWidth>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" fullWidth>
                    Create News
                </Button>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pHashTagSelects: state.hashTag.hashTagSelects,
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pGetAllHashTags: () => dispatch(getAllHashTags()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewsForm)
