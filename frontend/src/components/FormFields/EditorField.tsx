import { TextEditor } from '@/components/Common'
import { theme } from '@/utils'
import { Box, FormHelperText, InputLabel } from '@mui/material'
import { red } from '@mui/material/colors'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

export type IEditorFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    disabled: boolean
    placeholder?: string
    required?: boolean
}

export function EditorField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    placeholder,
    required = false,
}: IEditorFieldProps<TFormValues>) {
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
                <Box
                    sx={{
                        margin: theme.spacing(2, 0, 1),
                    }}
                >
                    <InputLabel
                        error={!!error?.message}
                        required={required}
                        sx={{
                            display: 'block',
                            fontWeight: 500,
                            color: '#000',
                            marginBottom: 1,
                            '.MuiFormLabel-asterisk': {
                                color: red[500],
                            },
                        }}
                    >
                        {label}
                    </InputLabel>
                    <TextEditor
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        placeholder={placeholder}
                        error={!!error}
                    />
                    <FormHelperText
                        disabled={disabled}
                        error={!!error?.message}
                        sx={{
                            margin: theme.spacing(0.5, 1.75, 0),
                        }}
                    >
                        {(error?.message as string) || ''}
                    </FormHelperText>
                </Box>
            )}
        />
    )
}
