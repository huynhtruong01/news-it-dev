import { InputField, SelectField, EditorField, AutoCompleteField } from '../FormFields'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { INewsData } from '../../models'
import { selectStatus, hashTagOptions } from '../../data'
import { theme } from '../../utils'
import { useForm } from 'react-hook-form'
import { Box, Button, Modal } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ButtonForm } from '../Common'
import { useToast } from '../../hooks'
import { newsApi } from '../../api'

export interface INewsModalFormProps {
    initValues: INewsData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const schema = yup.object().shape({
    title: yup.string().required('Please enter name.'),
    sapo: yup.string(),
    readTimes: yup.number(),
    thumbnailImage: yup.string().required('Please choose thumbnail image.'),
    coverImage: yup.string().required('Please choose cover image.'),
    content: yup.string().required('Please enter news content.'),
})

export function NewsModalForm({ initValues, open, setOpen }: INewsModalFormProps) {
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
            await newsApi.updateNews({ ...rest, id: initValues.id })

            toastSuccess(`Update user '${values.title}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleAdd = async (values: INewsData) => {
        try {
            const { hashTagOptionIds, ...rest } = values
            const hashTagIds = hashTagOptionIds.map((item) => item.id)
            const res = await newsApi.addNews({ ...rest, hashTagIds })

            toastSuccess(`Add user '${res.data.news.title}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleFormSubmit = async (values: INewsData) => {
        try {
            console.log('values submit: ', values.content)
            return
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
                                width: '65%',
                            }}
                        >
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
                        </Box>
                        <Box
                            sx={{
                                width: '35%',
                            }}
                        >
                            <InputField
                                form={form}
                                name={'thumbnailImage'}
                                label={'Thumbnail Image'}
                                disabled={isSubmitting}
                                placeholder={'Enter thumbnail image'}
                            />
                            <InputField
                                form={form}
                                name={'coverImage'}
                                label={'Cover Image'}
                                disabled={isSubmitting}
                                placeholder={'Enter cover image'}
                            />
                        </Box>
                    </Box>
                    <AutoCompleteField
                        form={form}
                        name={'hashTagOptionIds'}
                        label={'Tags'}
                        disabled={isSubmitting}
                        placeholder={'Choose tags'}
                        list={hashTagOptions}
                    />
                    <EditorField
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
