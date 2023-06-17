import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Modal } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { rolesApi } from '../../api'
import { useToast } from '../../hooks'
import { IRole, IRoleData } from '../../models'
import { ButtonForm } from '../Common'
import { ColorField, InputField } from '../FormFields'
import { connect } from 'react-redux'
import { AppDispatch } from '../../store'
import { addRole, updateRole } from '../../store/role'

export interface IRoleModalFormProps {
    initValues: IRoleData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    pAddRole: (data: IRole) => void
    pUpdateRole: (data: IRole) => void
}

const schema = yup.object().shape({
    name: yup.string().required('Please enter name.'),
    color: yup.string().required('Please enter color.'),
})

function RoleModalForm({
    initValues,
    open,
    setOpen,
    pAddRole,
    pUpdateRole,
}: IRoleModalFormProps) {
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
        setValue('description', initValues.description)
    }, [initValues, setValue])

    const resetModal = () => {
        reset()
        setOpen(false)
    }

    const handleUpdate = async (values: IRoleData) => {
        try {
            const res = await rolesApi.updateRole({ ...values, id: initValues.id })
            pUpdateRole(res.data.role)
            toastSuccess(`Update role '${values.name}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleAdd = async (values: IRoleData) => {
        try {
            const res = await rolesApi.addRole(values)
            pAddRole(res.data.role)
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
                    <InputField<IRoleData>
                        form={form}
                        name={'description'}
                        label={'Description'}
                        disabled={isSubmitting}
                        placeholder={'Enter description'}
                        multiline
                        minRows={2}
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pAddRole: (data: IRole) => dispatch(addRole(data)),
        pUpdateRole: (data: IRole) => dispatch(updateRole(data)),
    }
}

export default connect(null, mapDispatchToProps)(RoleModalForm)
