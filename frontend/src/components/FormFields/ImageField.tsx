import { TextField, TextFieldProps, InputLabel, Box, Avatar, Stack } from '@mui/material'
import { theme } from '@/utils'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useState } from 'react'
import { generateLinkImg } from '@/utils'

export type IImageFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    placeholder?: string
    disabled: boolean
    initValue: string
} & TextFieldProps

export function ImageField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    placeholder,
    disabled,
    initValue,
    ...rest
}: IImageFieldProps<TFormValues>) {
    const [img, setImg] = useState<string>(initValue)
    const {
        control,
        formState: { errors },
    } = form
    const error = errors[name]

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur } }) => (
                <Box margin={theme.spacing(2, 0, 1)} width={'100%'}>
                    <InputLabel
                        error={!!error?.message}
                        sx={{
                            fontWeight: 500,
                            color: '#000',
                        }}
                    >
                        {label}
                    </InputLabel>
                    <Stack direction="row" gap={1} alignItems="center" marginTop={1}>
                        <Box>
                            <Avatar
                                src={img}
                                alt=""
                                sx={{
                                    width: 48,
                                    height: 48,
                                }}
                            />
                        </Box>
                        <TextField
                            type="file"
                            fullWidth
                            onChange={(e) => {
                                const { files } = e.target as HTMLInputElement
                                if (files?.[0]) {
                                    const url = generateLinkImg(files?.[0])
                                    onChange(files?.[0])
                                    setImg(url)
                                }
                            }}
                            onBlur={onBlur}
                            disabled={disabled}
                            placeholder={placeholder}
                            helperText={(error?.message as string) || ''}
                            error={!!error?.message}
                            size="small"
                            inputProps={{
                                accept: 'image/*',
                            }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    padding: 1.5,
                                    height: 'auto',
                                    '&::file-selector-button': {
                                        fontFamily: 'Roboto, sans-serif',
                                        padding: 1.5,
                                        borderRadius: theme.spacing(0.75),
                                        backgroundColor: theme.palette.grey[300],
                                        border: 'none',
                                        outline: 'none',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                    },
                                },
                            }}
                            {...rest}
                        />
                    </Stack>
                </Box>
            )}
        />
    )
}
