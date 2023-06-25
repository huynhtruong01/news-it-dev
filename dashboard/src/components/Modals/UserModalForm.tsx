import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Modal } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { usersApi } from '../../api'
import { useToast } from '../../hooks'
import { IUserData, IOptionItem, IUser } from '../../models'
import { AppDispatch, AppState } from '../../store'
import { ButtonForm } from '../Common'
import {
    AutoCompleteField,
    CheckBoxField,
    InputField,
    PasswordField,
} from '../FormFields'
import { addUser, updateUser } from '../../store/user'

export interface IUserModalFormProps {
    initValues: IUserData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    pRoleSelects: IOptionItem[]
    pAddUser: (data: IUser) => void
    pUpdateUser: (data: IUser) => void
}

function UserModalForm({
    initValues,
    open,
    setOpen,
    pRoleSelects,
    pAddUser,
    pUpdateUser,
}: IUserModalFormProps) {
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
        getValues,
        watch,
    } = form

    const roleIds = watch('roleOptionIds')
    const admin = watch('isAdmin')

    useEffect(() => {
        const roles = getValues('roleOptionIds')
        const checkIsAdmin = roles?.map((r) => r.id).includes(1)
        setValue('isAdmin', !!checkIsAdmin)
    }, [roleIds])

    useEffect(() => {
        const roles = getValues('roleOptionIds')
        if (admin) {
            if (!roles?.find((r) => r.id === 1)) {
                roles?.unshift({ id: 1, name: 'admin' } as IOptionItem)
            }
        } else {
            const roleAdminIdx = roles?.findIndex((r) => r.id === 1) as number
            if (roleAdminIdx > -1) {
                roles?.splice(roleAdminIdx, 1)
            }
        }
        setValue('roleOptionIds', roles)
    }, [admin])

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
            const { password, confirmPassword, roleOptionIds, ...rest } = values
            const roleIds = (roleOptionIds?.map((role) => role.id) as number[]) || []
            const res = await usersApi.updateUser({ ...rest, id: initValues.id, roleIds })
            pUpdateUser(res.data.user)

            toastSuccess(`Update user '${values.username}' successfully.`)
        } catch (error) {
            throw new Error((error as Error).message as string)
        }
    }

    const handleAdd = async (values: IUserData) => {
        try {
            const { confirmPassword, roleOptionIds, ...rest } = values
            const roleIds = (roleOptionIds?.map((role) => role.id) as number[]) || []
            const res = await usersApi.addUser({ ...rest, roleIds })
            pAddUser(res.data.user)

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
                        <InputField<IUserData>
                            form={form}
                            name={'firstName'}
                            label={'First Name'}
                            disabled={isSubmitting}
                            placeholder={'Enter first name'}
                        />
                        <InputField<IUserData>
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
                    <InputField<IUserData>
                        form={form}
                        name={'emailAddress'}
                        label={'Email'}
                        disabled={isSubmitting}
                        placeholder={'Enter email'}
                    />
                    {!initValues.id && (
                        <>
                            <PasswordField<IUserData>
                                form={form}
                                name={'password'}
                                label={'Password'}
                                disabled={isSubmitting}
                            />
                            <PasswordField<IUserData>
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
                    <CheckBoxField<IUserData>
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        pAddUser: (data: IUser) => dispatch(addUser(data)),
        pUpdateUser: (data: IUser) => dispatch(updateUser(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserModalForm)
