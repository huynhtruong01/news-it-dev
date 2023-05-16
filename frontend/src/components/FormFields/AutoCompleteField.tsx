import { Autocomplete, TextField, AutocompleteProps } from '@mui/material'
import { Path, FieldValues, Controller } from 'react-hook-form'
import { IOptionItem } from '@/models'

export type IAutoCompleteFieldProps<TFormValues> = {
    form: TFormValues
    name: Path<TFormValues>
    label: string
    placeholder?: string
    disabled: boolean
    list: IOptionItem[]
} & AutocompleteProps<IOptionItem, false, false, false>

export function AutoCompleteField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    placeholder = '',
    disabled,
    list,
    ...rest
}: IAutoCompleteFieldProps<TFormValues>) {
    const {
        control,
        formState: { errors },
        getValues,
        watch,
    } = form
    const error = errors[name]

    const handleFilters = () => {
        const ids = getValues(name).map((val) => val.id)
        return list.filter((option) => !ids.includes(option.id))
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <Autocomplete
                    multiple
                    options={handleFilters()}
                    disabled={disabled}
                    value={watch(name)}
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
                            helperText={error?.message || ''}
                            margin="normal"
                        />
                    )}
                />
            )}
        />
    )
}
