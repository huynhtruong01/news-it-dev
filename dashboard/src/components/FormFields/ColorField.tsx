import { Controller, Path, FieldValues } from 'react-hook-form'
import { TextFieldProps } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'

export type IColorFieldProps<TFormValues> = {
    form: TFormValues
    name: Path<TFormValues>
    label: string
    disabled: boolean
} & TextFieldProps

export function ColorField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    ...rest
}: IColorFieldProps<TFormValues>) {
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
                <MuiColorInput
                    fullWidth
                    margin="normal"
                    label={label}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={!!error?.message}
                    helperText={error?.message || ''}
                    disabled={disabled}
                />
            )}
        />
    )
}
