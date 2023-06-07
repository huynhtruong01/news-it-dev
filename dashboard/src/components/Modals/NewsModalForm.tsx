import {
    InputField,
    SelectField,
    EditorField,
    AutoCompleteField,
    ImageField,
} from '../FormFields'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { INews, INewsData, IOptionItem } from '../../models'
import { selectStatus } from '../../data'
import { generateIds, checkTypeImg, checkSizeImg } from '../../utils'
import { SIZE_10_MB, SIZE_4_MB } from '../../consts'
import { useForm } from 'react-hook-form'
import { Box, Modal } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ButtonForm } from '../Common'
import { useToast } from '../../hooks'
import { newsApi } from '../../api'
import { connect } from 'react-redux'
import { AppState } from '../../store'

export interface INewsModalFormProps {
    initValues: INewsData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    pHashTagSelects: IOptionItem[]
}

const schema = yup.object().shape({
    title: yup.string().required('Please enter name.'),
    sapo: yup.string(),
    readTimes: yup.number(),
    thumbnailImage: yup
        .mixed<File>()
        .test('is-nullable-thumbnail', 'Please choose thumbnail image.', function (file) {
            const { thumbnailImage, coverImage } = this.parent
            if (!((thumbnailImage && coverImage) || file?.name)) return
            if (file?.name) return true
        })
        .test('type-img', 'Invalid type image.', (file) => checkTypeImg(file as File))
        .test('size-img', 'Maximum 4MB.', (file) =>
            checkSizeImg(file as File, SIZE_4_MB)
        ),
    coverImage: yup
        .mixed<File>()
        .test('is-nullable-cover', 'Please choose cover image.', function (file) {
            const { thumbnailImage, coverImage } = this.parent
            if (!((thumbnailImage && coverImage) || file?.name)) return
            if (file?.name) return true
        })
        .test('type-img', 'Invalid type image.', (file) => checkTypeImg(file as File))
        .test('size-img', 'Maximum 10MB.', (file) =>
            checkSizeImg(file as File, SIZE_10_MB)
        ),
    content: yup.string().required('Please enter news content.'),
})

const generateNewValues = (values: INewsData) => {
    const { hashTagOptionIds, ...rest } = values
    const ids = generateIds(hashTagOptionIds as IOptionItem[]) as number[]

    return {
        newValues: rest,
        ids,
    }
}

function NewsModalForm({
    initValues,
    open,
    setOpen,
    pHashTagSelects,
}: INewsModalFormProps) {
    const { toastSuccess, toastError } = useToast()
    const form = useForm<INewsData>({
        defaultValues: initValues,
        resolver: yupResolver(schema),
    })

    const {
        formState: { isSubmitting },
        handleSubmit,
        reset,
        setValue,
    } = form

    useEffect(() => {
        setValue('title', initValues.title)
        setValue('sapo', initValues.sapo)
        setValue('content', initValues.content)
        setValue('readTimes', initValues.readTimes)
        setValue('hashTags', initValues.hashTags)
        setValue('status', initValues.status)
        setValue('coverImage', initValues.coverImage)
        setValue('thumbnailImage', initValues.thumbnailImage)
        setValue('hashTagOptionIds', initValues.hashTagOptionIds)
    }, [initValues, setValue])

    const resetModal = () => {
        setOpen(false)
        reset()
    }

    const handleUpdate = async (values: INewsData) => {
        try {
            const { newValues, ids } = generateNewValues(values)
            await newsApi.updateNews({
                ...newValues,
                hashTagIds: ids as number[],
                id: initValues.id,
            } as INews)

            toastSuccess(`Update user '${newValues?.title}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleAdd = async (values: INewsData) => {
        try {
            const { newValues, ids } = generateNewValues(values)
            const res = await newsApi.addNews({ ...newValues, hashTagIds: ids })

            toastSuccess(`Add user '${res.data.news.title}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleFormSubmit = async (values: INewsData) => {
        try {
            if (initValues.id) {
                await handleUpdate(values)
            } else {
                await handleAdd(values)
            }

            resetModal()
        } catch (error) {
            toastError((error as Error).message)
        }
    }

    const handleClose = () => {
        resetModal()
    }

    return (
        <Modal
            keepMounted
            open={open}
            sx={{
                overflow: 'auto',
                padding: 4,
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit(handleFormSubmit)}
                sx={{
                    width: '100%',
                    minHeight: 'calc(100vh - 4rem)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    margin: 'auto',
                    p: 4,
                    borderRadius: 0.5,
                }}
            >
                <Box
                    sx={{
                        marginBottom: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 4,
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                            }}
                        >
                            <InputField<INewsData>
                                form={form}
                                name={'title'}
                                label={'Title'}
                                disabled={isSubmitting}
                                placeholder={'Enter title'}
                            />
                            <InputField<INewsData>
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
                                <InputField<INewsData>
                                    type="number"
                                    form={form}
                                    name={'readTimes'}
                                    label={'Read Times'}
                                    disabled={isSubmitting}
                                />
                                <SelectField<INewsData>
                                    form={form}
                                    name={'status'}
                                    label={'Status'}
                                    disabled={isSubmitting}
                                    selects={selectStatus}
                                />
                            </Box>
                            <AutoCompleteField<INewsData>
                                form={form}
                                name={'hashTagOptionIds'}
                                label={'Tags'}
                                disabled={isSubmitting}
                                placeholder={'Choose tags'}
                                list={pHashTagSelects}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: '25%',
                            }}
                        >
                            <ImageField<INewsData>
                                form={form}
                                name={'thumbnailImage'}
                                label={'Thumbnail Image'}
                                disabled={isSubmitting}
                                initValue={initValues.thumbnailImage as string}
                                placeholder={'Enter thumbnail image'}
                            />
                            <ImageField<INewsData>
                                form={form}
                                name={'coverImage'}
                                label={'Cover Image'}
                                disabled={isSubmitting}
                                initValue={initValues.coverImage as string}
                                placeholder={'Enter cover image'}
                            />
                        </Box>
                    </Box>

                    <EditorField<INewsData>
                        form={form}
                        name={'content'}
                        label={'Content'}
                        disabled={isSubmitting}
                        placeholder={'Enter content'}
                    />
                </Box>
                <ButtonForm<INewsData>
                    initValues={initValues}
                    disabled={isSubmitting}
                    onClose={handleClose}
                />
            </Box>
        </Modal>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pHashTagSelects: state.hashTag.hashTagSelects,
    }
}

export default connect(mapStateToProps, null)(NewsModalForm)
