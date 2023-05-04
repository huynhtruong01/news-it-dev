import { InputField, CheckBoxField } from '../FormFields'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IUserData } from '../../models'
import { theme } from '../../utils'
import { useForm } from 'react-hook-form'
import { Box, Button, Modal } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Dispatch, SetStateAction, useEffect } from 'react'

export interface IUserModalFormProps {
    initValues: IUserData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const schema = yup.object().shape({
    username: yup.string().required('Please enter username.'),
    firstName: yup.string().required('Please enter first name.'),
    lastName: yup.string().required('Please enter last name.'),
    emailAddress: yup.string().required('Please enter email.').email('Invalid email.'),
    isAdmin: yup.boolean(),
})

export function UserModalForm({ initValues, open, setOpen }: IUserModalFormProps) {
    const form = useForm<IUserData>({
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
        setValue('username', initValues.username)
        setValue('firstName', initValues.firstName)
        setValue('lastName', initValues.lastName)
        setValue('emailAddress', initValues.emailAddress)
        setValue('isAdmin', initValues.isAdmin)
    }, [initValues, setValue])

    const handleFormSubmit = (values: IUserData) => {
        console.log(values)
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
        reset()
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
                    <InputField
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
                    <CheckBoxField
                        form={form}
                        name={'isAdmin'}
                        label={'Admin'}
                        disabled={isSubmitting}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            backgroundColor: theme.palette.grey[500],
                            '&:hover': {
                                backgroundColor: theme.palette.grey[700],
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
