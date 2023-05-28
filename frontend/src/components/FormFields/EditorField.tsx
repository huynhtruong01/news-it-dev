import { Box, FormHelperText, FormLabel } from '@mui/material'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { theme } from '@/utils'
import { TextEditor } from '@/components/Common'

export type IEditorFieldProps<TFormValues> = {
    form: TFormValues
    name: Path<TFormValues>
    label: string
    disabled: boolean
    placeholder?: string
}

export function EditorField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    placeholder,
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
                    <FormLabel
                        error={!!error?.message}
                        sx={{
                            display: 'inline-block',
                            fontWeight: 500,
                            color: '#000',
                            marginBottom: 1,
                        }}
                    >
                        {label}
                    </FormLabel>
                    <TextEditor
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        placeholder={placeholder}
                        error={error}
                    />
                    <FormHelperText
                        disabled={disabled}
                        error={!!error?.message}
                        sx={{
                            margin: theme.spacing(0.5, 1.75, 0),
                        }}
                    >
                        {error?.message || ''}
                    </FormHelperText>
                </Box>
            )}
        />
    )
}
