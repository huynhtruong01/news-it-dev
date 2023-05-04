import { InputField, SelectField } from '../FormFields'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { INewsData } from '../../models'
import { selectStatus } from '../../data'
import { theme } from '../../utils'
import { useForm } from 'react-hook-form'
import { Box, Button, Modal } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Dispatch, SetStateAction, useEffect } from 'react'

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
    readTimes: yup.number(),
    content: yup.string().required('Please enter news content.'),
})

export function NewsModalForm({ initValues, open, setOpen }: INewsModalFormProps) {
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
    }, [initValues, setValue])

    const handleFormSubmit = (values: INewsData) => {
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
                    <InputField
                        form={form}
                        name={'hashTags'}
                        label={'Hash Tags'}
                        disabled={isSubmitting}
                        placeholder={'Enter hash tags'}
                        minRows={4}
                        multiline
                    />
                    <InputField
                        form={form}
                        name={'content'}
                        label={'Content'}
                        disabled={isSubmitting}
                        placeholder={'Enter content'}
                        minRows={8}
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
