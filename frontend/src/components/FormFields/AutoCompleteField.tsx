import {
    Autocomplete,
    TextField,
    AutocompleteProps,
    Box,
    InputLabel,
} from '@mui/material'
import { Path, FieldValues, Controller } from 'react-hook-form'
import { IOptionItem } from '@/models'
import { theme } from '@/utils'

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
                                {...params}
                                placeholder={placeholder}
                                error={!!error?.message}
                                helperText={error?.message || ''}
                                sx={{
                                    marginTop: 1,
                                    backgroundColor: '#fff',
                                }}
                            />
                        </Box>
                    )}
                />
            )}
        />
    )
}
