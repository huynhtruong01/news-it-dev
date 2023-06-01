import { Controller, Path, FieldValues } from 'react-hook-form'
import { TextFieldProps, Box, InputLabel } from '@mui/material'
import { MuiColorInput } from 'mui-color-input'
import { theme } from '@/utils'

export type IColorFieldProps<TFormValues> = {
    form: TFormValues
    name: Path<TFormValues>
    label: string
    disabled: boolean
} & TextFieldProps

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
                <Box margin={theme.spacing(2, 0, 1)} width={'100%'}>
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
