import { InputField } from '../FormFields'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IRoleData } from '../../models'
import { theme } from '../../utils'
import { useForm } from 'react-hook-form'
import { Box, Button, Modal } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Dispatch, SetStateAction, useEffect } from 'react'

export interface IRoleModalFormProps {
    initValues: IRoleData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const schema = yup.object().shape({
    name: yup.string().required('Please enter name.'),
})

export function RoleModalForm({ initValues, open, setOpen }: IRoleModalFormProps) {
    const form = useForm<IRoleData>({
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
    }, [initValues, setValue])

    const handleFormSubmit = (values: IRoleData) => {
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
                    <InputField
                        form={form}
                        name={'name'}
                        label={'Name'}
                        disabled={isSubmitting}
                        placeholder={'Enter name'}
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
