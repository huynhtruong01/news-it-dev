import { Controller, Path, FieldValues } from 'react-hook-form'
import { FormControl, Select, InputLabel, FormHelperText, MenuItem } from '@mui/material'
import { ISelectValue } from '../../models'

export type ISelectFieldProps<TFormValues> = {
    form: TFormValues
    name: Path<TFormValues>
    label: string
    disabled: boolean
    selects: ISelectValue[]
}

export function SelectField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    selects,
}: ISelectFieldProps<TFormValues>) {
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
                <FormControl
                    fullWidth
                    disabled={disabled}
                    error={!!error?.message}
                    margin="normal"
                >
                    <InputLabel error={!!error?.message}>{label}</InputLabel>
                    <Select
                        value={value}
                        label={label}
                        onChange={onChange}
                        onBlur={onBlur}
                        sx={{
                            textTransform: 'capitalize',
                        }}
                    >
                        {selects.map((select) => (
                            <MenuItem
                                key={select.value}
                                value={select.value}
                                sx={{
                                    textTransform: 'capitalize',
                                }}
                            >
                                {select.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error={!!error?.message}>
                        {error?.message || ''}
                    </FormHelperText>
                </FormControl>
            )}
        />
    )
}
