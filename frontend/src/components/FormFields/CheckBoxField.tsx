import { Controller, Path, FieldValues } from 'react-hook-form'
import { FormControlLabel, Checkbox, FormControlLabelProps } from '@mui/material'

export type ICheckBoxFieldProps<TFormValues> = {
    form: TFormValues
    name: Path<TFormValues>
    label: string
    disabled: boolean
} & FormControlLabelProps

export function CheckBoxField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    ...rest
}: ICheckBoxFieldProps<TFormValues>) {
    const { control } = form

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, onBlur } }) => (
                <FormControlLabel
                    {...rest}
                    disabled={disabled}
                    control={
                        <Checkbox checked={value} onChange={onChange} onBlur={onBlur} />
                    }
                    label={label}
                />
            )}
        />
    )
}
