import { Path, FieldValues, Controller } from 'react-hook-form'
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { useState } from 'react'

export type IPasswordFieldProps<TFormValues> = {
    form: TFormValues
    name: Path<TFormValues>
    label: string
    disabled: boolean
}

export function PasswordField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
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
            render={({ field: { onChange, value, onBlur } }) => (
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel error={!!error?.message}>{label}</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPasswordClick}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={label}
                        error={!!error?.message}
                        disabled={disabled}
                    />
                    <FormHelperText error={!!error?.message}>
                        {error?.message || ''}
                    </FormHelperText>
                </FormControl>
            )}
        />
    )
}
