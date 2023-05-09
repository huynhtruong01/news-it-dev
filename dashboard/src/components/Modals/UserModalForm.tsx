import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Modal } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { usersApi } from '../../api'
import { useToast } from '../../hooks'
import { IUserData, IOptionItem } from '../../models'
import { AppState } from '../../store'
import { ButtonForm } from '../Common'
import {
    AutoCompleteField,
    CheckBoxField,
    InputField,
    PasswordField,
} from '../FormFields'

export interface IUserModalFormProps {
    initValues: IUserData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    pRoleSelects: IOptionItem[]
}

function UserModalForm({ initValues, open, setOpen, pRoleSelects }: IUserModalFormProps) {
    const { toastSuccess, toastError } = useToast()

    const schema = yup.object().shape({
        username: yup.string().required('Please enter username.'),
        firstName: yup.string().required('Please enter first name.'),
        lastName: yup.string().required('Please enter last name.'),
        emailAddress: yup
            .string()
            .required('Please enter email.')
            .email('Invalid email.'),
        isAdmin: yup.boolean(),
        password: yup.string().when(['id'], {
            is: () => !initValues.id,
            then: (schema) =>
                schema
                    .required('Please enter password.')
                    .min(6, 'Password must be at least 6 characters.'),
        }),
        confirmPassword: yup.string().when(['id'], {
            is: () => !initValues.id,
            then: (schema) =>
                schema
                    .required('Please enter confirm password.')
                    .min(6, 'Password must be at least 6 characters.')
                    .oneOf([yup.ref('password')], "Confirm password don't match."),
        }),
        roleOptionIds: yup.array().min(1, 'Please choose role for user.'),
    })

    const form = useForm<IUserData>({
        defaultValues: { ...initValues, password: '', confirmPassword: '' },
        resolver: yupResolver(schema),
    })

    const {
        formState: { isSubmitting },
        handleSubmit,
        reset,
        setValue,
    } = form

    useEffect(() => {
        setValue('username', initValues.username)
        setValue('firstName', initValues.firstName)
        setValue('lastName', initValues.lastName)
        setValue('emailAddress', initValues.emailAddress)
        setValue('isAdmin', initValues.isAdmin)
        setValue('roleOptionIds', initValues.roleOptionIds)
    }, [initValues, setValue])

    const resetModal = () => {
        reset()
        setOpen(false)
    }

    const handleUpdate = async (values: IUserData) => {
        try {
            const { password, confirmPassword, ...rest } = values
            await usersApi.updateUser({ ...rest, id: initValues.id })

            toastSuccess(`Update user '${values.username}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleAdd = async (values: IUserData) => {
        try {
            const { confirmPassword, roleOptionIds, ...rest } = values
            const roleIds = roleOptionIds.map((role) => role.id)
            const res = await usersApi.addUser({ ...rest, roleIds })

            toastSuccess(`Add user '${res.data.user.username}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleFormSubmit = async (values: IUserData) => {
        try {
            if (initValues.id) {
                await handleUpdate(values)
            } else {
                await handleAdd(values)
            }

            resetModal()
        } catch (error) {
            console.log(error)
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
                    backgroundColor: 'background.paper',
                    boxShadow: 24,
                    padding: 4,
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
                            gap: 3,
                        }}
                    >
                        <InputField
                            form={form}
                            name={'firstName'}
                            label={'First Name'}
                            disabled={isSubmitting}
                            placeholder={'Enter first name'}
                        />
                        <InputField
                            form={form}
                            name={'lastName'}
                            label={'Last Name'}
                            disabled={isSubmitting}
                            placeholder={'Enter last name'}
                        />
                    </Box>
                    <InputField<IUserData>
                        form={form}
                        name={'username'}
                        label={'Username'}
                        disabled={isSubmitting}
                        placeholder={'Enter username'}
                    />
                    <InputField
                        form={form}
                        name={'emailAddress'}
                        label={'Email'}
                        disabled={isSubmitting}
                        placeholder={'Enter email'}
                    />
                    {!initValues.id && (
                        <>
                            <PasswordField
                                form={form}
                                name={'password'}
                                label={'Password'}
                                disabled={isSubmitting}
                            />
                            <PasswordField
                                form={form}
                                name={'confirmPassword'}
                                label={'Confirm Password'}
                                disabled={isSubmitting}
                            />
                        </>
                    )}
                    <AutoCompleteField<IUserData>
                        form={form}
                        name={'roleOptionIds'}
                        label={'Roles'}
                        disabled={isSubmitting}
                        placeholder={'Choose roles'}
                        list={pRoleSelects}
                    />
                    <CheckBoxField
                        form={form}
                        name={'isAdmin'}
                        label={'Admin'}
                        disabled={isSubmitting}
                    />
                </Box>
                <ButtonForm<IUserData>
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
        pRoleSelects: state.role.roleSelects,
    }
}

export default connect(mapStateToProps, null)(UserModalForm)
