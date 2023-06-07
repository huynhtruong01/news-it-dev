import { theme } from '@/utils'
import { Box, BoxProps, InputLabel } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

export type IColorFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    disabled: boolean
} & BoxProps

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
                <Box {...rest} margin={theme.spacing(2, 0, 1)} width={'100%'}>
                    <InputLabel
                        error={!!error?.message}
                        sx={{
                            display: 'block',
                            fontWeight: 500,
                            color: '#000',
                            marginBottom: 1,
                        }}
                    >
                        {label}
                    </InputLabel>
                    <MuiColorInput
                        fullWidth
                        margin="small"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!error?.message}
                        helperText={error?.message || ''}
                        disabled={disabled}
                    />
                </Box>
            )}
        />
    )
}
