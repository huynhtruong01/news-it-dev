import { Controller, FieldValues, Path } from 'react-hook-form'
import { TextField, TextFieldProps, InputLabel, Box } from '@mui/material'
import { theme } from '@/utils'

export type IInputFieldProps<TFormValues> = {
    form: TFormValues
    name: Path<TFormValues>
    label: string
    placeholder?: string
    disabled: boolean
} & TextFieldProps

export function InputField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    placeholder,
    disabled,
    ...rest
}: IInputFieldProps<TFormValues>) {
    const {
        control,
        formState: { errors },
    } = form
    const error = errors[name]

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, onBlur } }) => (
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
                    <TextField
                        fullWidth
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={disabled}
                        placeholder={placeholder}
                        helperText={error?.message}
                        error={!!error?.message}
                        size="small"
                        sx={{
                            marginTop: 1,
                        }}
                        {...rest}
                    />
                </Box>
            )}
        />
    )
}
