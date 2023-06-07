import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Modal } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { hashTagsApi } from '../../api'
import { SIZE_10_MB } from '../../consts'
import { useToast } from '../../hooks'
import { IHashTagData } from '../../models'
import { checkSizeImg, checkTypeImg } from '../../utils'
import { ButtonForm } from '../Common'
import { ColorField, ImageField, InputField } from '../FormFields'

export interface IHashTagModalFormProps {
    initValues: IHashTagData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const schema = yup.object().shape({
    title: yup.string().required('Please enter title.'),
    name: yup.string().required('Please enter name.'),
    description: yup.string().required('Please enter description.'),
    color: yup.string().required('Please enter color.'),
    iconImage: yup
        .mixed<File>()
        .test('type-img', 'Invalid type image.', (file) => checkTypeImg(file as File))
        .test('size-img', 'Maximum 10MB.', (file) =>
            checkSizeImg(file as File, SIZE_10_MB)
        ),
})

export function HashTagModalForm({ initValues, open, setOpen }: IHashTagModalFormProps) {
    const { toastSuccess, toastError } = useToast()
    const form = useForm<IHashTagData>({
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
        setValue('name', initValues.name)
        setValue('description', initValues.description)
        setValue('iconImage', initValues.iconImage)
        setValue('color', initValues.color)
    }, [initValues, setValue])

    const resetModal = () => {
        reset()
        setOpen(false)
    }

    const handleUpdate = async (values: IHashTagData) => {
        try {
            await hashTagsApi.updateHashTag({ ...values, id: initValues.id as number })

            toastSuccess(`Update tag '${values.name}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleAdd = async (values: IHashTagData) => {
        try {
            const res = await hashTagsApi.addHashTag(values)

            toastSuccess(`Add tag '${res.data.hashTag.name}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleFormSubmit = async (values: IHashTagData) => {
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
                    margin: 'auto',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 0.5,
                }}
            >
                <Box
                    sx={{
                        marginBottom: 3,
                    }}
                >
                    <InputField<IHashTagData>
                        form={form}
                        name={'title'}
                        label={'Title'}
                        disabled={isSubmitting}
                        placeholder={'Enter title'}
                    />
                    <InputField<IHashTagData>
                        form={form}
                        name={'name'}
                        label={'Name'}
                        disabled={isSubmitting}
                        placeholder={'Enter name'}
                    />
                    <InputField<IHashTagData>
                        form={form}
                        name={'description'}
                        label={'Description'}
                        disabled={isSubmitting}
                        placeholder={'Enter description'}
                        minRows={4}
                        multiline
                    />
                    <ImageField<IHashTagData>
                        form={form}
                        name={'iconImage'}
                        label={'Icon Image'}
                        disabled={isSubmitting}
                        initValue={initValues.iconImage as string}
                        placeholder={'Enter cover image'}
                    />
                    <ColorField<IHashTagData>
                        form={form}
                        name={'color'}
                        label={'Color'}
                        disabled={isSubmitting}
                        placeholder={'Enter color'}
                    />
                </Box>
                <ButtonForm<IHashTagData>
                    initValues={initValues}
                    disabled={isSubmitting}
                    onClose={handleClose}
                />
            </Box>
        </Modal>
    )
}
