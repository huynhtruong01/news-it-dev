import { InputField } from '../FormFields'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IHashTagData } from '../../models'
import { theme } from '../../utils'
import { useForm } from 'react-hook-form'
import { Box, Button, Modal } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Dispatch, SetStateAction, useEffect } from 'react'

export interface IHashTagModalFormProps {
    initValues: IHashTagData
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const schema = yup.object().shape({
    name: yup.string().required('Please enter name.'),
    description: yup.string().required('Please enter description.'),
})

export function HashTagModalForm({ initValues, open, setOpen }: IHashTagModalFormProps) {
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
    }, [initValues, setValue])

    const handleFormSubmit = (values: IHashTagData) => {
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
                    <InputField
                        form={form}
                        name={'description'}
                        label={'Description'}
                        disabled={isSubmitting}
                        placeholder={'Enter description'}
                        minRows={4}
                        multiline
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
