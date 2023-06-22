import { IObjectCommon } from '@/models'
import {
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    InputLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { useState } from 'react'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export type IRadioListFieldProps<TFormValues extends FieldValues> = {
    form: UseFormReturn<TFormValues, any>
    name: Path<TFormValues>
    label: string
    disabled: boolean
    radioList: IObjectCommon[]
    required?: boolean
    onStatusChange?: ((value: string) => void) | null
}

export function RadioListField<TFormValues extends FieldValues = FieldValues>({
    form,
    name,
    label,
    disabled,
    radioList,
    required = false,
    onStatusChange = null,
}: IRadioListFieldProps<TFormValues>) {
    const [value, setValue] = useState<string>('')
    const { t } = useTranslation()
    const { control, formState } = form
    const { errors } = formState
    const error = errors[name]

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur } }) => (
                <FormGroup>
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
                    <RadioGroup
                        defaultValue={''}
                        value={value}
                        onChange={(e) => {
                            const { value } = e.target
                            const radio = radioList.find((r) => r.id === value)
                            if (radio) {
                                if (onStatusChange) onStatusChange(radio.id as string)
                                onChange(radio)
                                setValue(value)
                            }
                        }}
                        onBlur={onBlur}
                        sx={{
                            marginTop: 1,
                        }}
                    >
                        {radioList.map((radio) => (
                            <FormControlLabel
                                key={radio.id}
                                value={radio.id}
                                control={<Radio />}
                                label={t(`message.${radio.name as string}`)}
                                disabled={disabled}
                            />
                        ))}
                    </RadioGroup>
                    <FormHelperText error={!!error}>
                        {(error?.message as string) || ''}
                    </FormHelperText>
                </FormGroup>
            )}
        />
    )
}
