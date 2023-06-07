import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

export type ICheckBoxFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    disabled: boolean
}

export function CheckBoxField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
}: ICheckBoxFieldProps<TFormValues>) {
    const { control } = form

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, onBlur } }) => (
                <FormControlLabel
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
