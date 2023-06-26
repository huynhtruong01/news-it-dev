import { Autocomplete, TextField, Box, InputLabel } from '@mui/material'
import { Path, FieldValues, Controller, UseFormReturn } from 'react-hook-form'
import { IObjectCommon, IOptionItem } from '@/models'
import { theme } from '@/utils'

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
        const ids = getValues(name).map((val: IObjectCommon) => val.id)
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
                    filterSelectedOptions
                    onChange={(e, newValues) => {
                        onChange(newValues)
                    }}
                    onBlur={onBlur}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') return option
                        return option.name as string
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
                                helperText={(error?.message as string) || ''}
                                sx={{
                                    marginTop: 1,
                                    '.MuiInputBase-root': {
                                        backgroundColor: '#fff',
                                        alignItems: 'flex-start',
                                    },
                                }}
                                multiline
                                minRows={3}
                            />
                        </Box>
                    )}
                />
            )}
        />
    )
}
