import { IObjectCommon } from '@/models'
import { theme } from '@/utils'
import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export type ISelectFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    disabled: boolean
    selects: IObjectCommon[]
}

export function SelectField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    selects,
}: ISelectFieldProps<TFormValues>) {
    const { t } = useTranslation()
    const {
        control,
        formState: { errors },
    } = form
    const error = errors[name]

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, onBlur, ref } }) => (
                <Box margin={theme.spacing(2, 0, 1)} width={'100%'}>
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
                    <FormControl fullWidth size="small">
                        <Select
                            ref={ref}
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
                                '& .MuiSelect-select': {
                                    width: '100%',
                                    overflow: 'visible',
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
                                    {t(select.name as string)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormHelperText error={!!error?.message}>
                        {(error?.message as string) || ''}
                    </FormHelperText>
                </Box>
            )}
        />
    )
}
