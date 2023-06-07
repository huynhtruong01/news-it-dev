import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Modal } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { rolesApi } from '../../api'
import { useToast } from '../../hooks'
import { IRoleData } from '../../models'
import { ButtonForm } from '../Common'
import { ColorField, InputField } from '../FormFields'

export interface IRoleModalFormProps {
    initValues: IRoleData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const schema = yup.object().shape({
    name: yup.string().required('Please enter name.'),
    color: yup.string().required('Please enter color.'),
})

export function RoleModalForm({ initValues, open, setOpen }: IRoleModalFormProps) {
    const form = useForm<IRoleData>({
        defaultValues: initValues,
        resolver: yupResolver(schema),
    })
    const { toastSuccess, toastError } = useToast()

    const {
        formState: { isSubmitting },
        handleSubmit,
        reset,
        setValue,
    } = form

    useEffect(() => {
        setValue('name', initValues.name)
        setValue('color', initValues.color)
    }, [initValues, setValue])

    const resetModal = () => {
        reset()
        setOpen(false)
    }

    const handleUpdate = async (values: IRoleData) => {
        try {
            await rolesApi.updateRole({ ...values, id: initValues.id })

            toastSuccess(`Update role '${values.name}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleAdd = async (values: IRoleData) => {
        try {
            const res = await rolesApi.addRole(values)

            toastSuccess(`Add role '${res.data.role.name}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleFormSubmit = async (values: IRoleData) => {
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
                    <InputField<IRoleData>
                        form={form}
                        name={'name'}
                        label={'Name'}
                        disabled={isSubmitting}
                        placeholder={'Enter name'}
                    />
                    <ColorField<IRoleData>
                        form={form}
                        name={'color'}
                        label={'Color'}
                        disabled={isSubmitting}
                        placeholder={'Enter color'}
                    />
                </Box>
                <ButtonForm<IRoleData>
                    initValues={initValues}
                    disabled={isSubmitting}
                    onClose={handleClose}
                />
            </Box>
        </Modal>
    )
}
