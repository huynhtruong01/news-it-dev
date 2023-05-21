import { Controller, Path, FieldValues } from 'react-hook-form'
import { Box, Select, InputLabel, FormHelperText, MenuItem } from '@mui/material'
import { ISelectValue } from '@/models'
import { theme } from '@/utils'

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
                <Box margin={theme.spacing(2, 0, 1)} width={'100%'}>
                    {/* <FormControl fullWidth> */}
                    <InputLabel
                        error={!!error?.message}
                        sx={{
                            fontWeight: 500,
                            color: '#000',
                        }}
                        disabled={disabled}
                    >
                        {label}
                    </InputLabel>
                    <Select
                        autoWidth
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        sx={{
                            width: '100%',
                            textTransform: 'capitalize',
                            marginTop: 1,
                            ul: {
                                width: '100%',
                            },
                            backgroundColor: '#fff',
                        }}
                        size="small"
                        MenuProps={{
                            classes: {
                                paper: {
                                    '& .MuiSelect-select': {
                                        overflow: 'visible !important', // Override the overflow property for the select element
                                    },
                                },
                            },
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
                    {/* </FormControl> */}
                </Box>
            )}
        />
    )
}
