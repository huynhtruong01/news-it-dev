import { Controller, FieldValues, Path } from 'react-hook-form'
import { TextField, TextFieldProps } from '@mui/material'

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
    const { control, formState } = form
    const { errors } = formState
    const error = errors[name]

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, onBlur } }) => (
                <TextField
                    margin="normal"
                    fullWidth
                    label={label}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    helperText={error?.message}
                    error={!!error?.message}
                    {...rest}
                />
            )}
        />
    )
}