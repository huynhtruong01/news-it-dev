import { Autocomplete, TextField } from '@mui/material'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { IOptionItem } from '../../models'

export type IAutoCompleteFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    placeholder?: string
    disabled: boolean
    list: IOptionItem[]
}

export function AutoCompleteField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    placeholder = '',
    disabled,
    list,
}: IAutoCompleteFieldProps<TFormValues>) {
    const {
        control,
        formState: { errors },
        getValues,
        watch,
    } = form
    const error = errors[name]

    const handleFilters = () => {
        const ids = getValues(name).map((val: any) => val.id)
        return list.filter((option) => !ids.includes(option.id))
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur } }) => (
                <Autocomplete
                    multiple
                    options={handleFilters()}
                    disabled={disabled}
                    value={watch(name)}
                    size="small"
                    filterSelectedOptions
                    onChange={(e, newValues) => {
                        onChange(newValues)
                    }}
                    onBlur={onBlur}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') return option
                        return option.name
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            error={!!error?.message}
                            helperText={(error?.message as string) || ''}
                            margin="normal"
                        />
                    )}
                />
            )}
        />
    )
}
