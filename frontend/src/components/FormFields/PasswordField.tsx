import { theme } from '@/utils'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
    Box,
    BoxProps,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useState } from 'react'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

export type IPasswordFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    disabled: boolean
    required?: boolean
} & BoxProps

export function PasswordField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    required = false,
    ...rest
}: IPasswordFieldProps<TFormValues>) {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { control, formState } = form
    const { errors } = formState
    const error = errors[name]

    const handleShowPasswordClick = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, onBlur, ref } }) => (
                <Box margin={theme.spacing(2, 0, 1)} width={'100%'} {...rest}>
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
                        type={showPassword ? 'text' : 'password'}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPasswordClick}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={!!error?.message}
                        helperText={(error?.message as string) || ''}
                        disabled={disabled}
                        size="small"
                        sx={{
                            marginTop: 1,
                            backgroundColor: '#fff',
                        }}
                    />
                </Box>
            )}
        />
    )
}
