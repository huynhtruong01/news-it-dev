import { Box, FormHelperText } from '@mui/material'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { theme } from '../../utils'
import { TextEditor } from '../Common'

export type IEditorFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    disabled: boolean
    placeholder?: string
}

export function EditorField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
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
                    <TextEditor
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        placeholder={placeholder}
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
