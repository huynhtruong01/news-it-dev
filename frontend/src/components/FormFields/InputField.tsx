import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { TextField, TextFieldProps, InputLabel, Box } from '@mui/material'
import { theme } from '@/utils'
import { red } from '@mui/material/colors'

export type IInputFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    placeholder?: string
    disabled: boolean
    required?: boolean
} & TextFieldProps

export function InputField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    placeholder,
    disabled,
    required = false,
    ...rest
}: IInputFieldProps<TFormValues>) {
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
                        required={required}
                        sx={{
                            fontWeight: 500,
                            color: '#000',
                            '.MuiFormLabel-asterisk': {
                                color: red[500],
                            },
                        }}
                    >
                        {label}
                    </InputLabel>
                    <TextField
                        fullWidth
                        inputRef={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={disabled}
                        placeholder={placeholder}
                        helperText={(error?.message as string) || ''}
                        error={!!error?.message}
                        size="small"
                        sx={{
                            marginTop: 1,
                            '.MuiInputBase-root': {
                                backgroundColor: theme.palette.primary.contrastText,
                            },
                        }}
                        {...rest}
                    />
                </Box>
            )}
        />
    )
}
