import {
    Box,
    BoxProps,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import { useState } from 'react'
import { IObjectCommon } from '@/models'
import { ALL } from '@/consts'
import { theme } from '@/utils'
import { useTranslation } from 'react-i18next'

export interface ISelectFilterProps extends BoxProps {
    label: string
    selects: IObjectCommon[]
    initValue?: string | number
    onFilterChange: (value: string | number) => void
    isAll?: boolean
}

export function SelectFilter({
    selects,
    label,
    initValue = ALL,
    isAll = true,
    onFilterChange,
    ...rest
}: ISelectFilterProps) {
    const { t } = useTranslation()
    const [value, setValue] = useState<string>(String(initValue))

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { value } = e.target

        onFilterChange(value)
        setValue(String(value))
    }

    return (
        <Box
            sx={{
                display: 'inline-block',
                backgroundColor: theme.palette.primary.contrastText,
            }}
            minWidth={100}
            {...rest}
        >
            <FormControl size="small" fullWidth>
                <InputLabel>{label ? t(`label.${label}`) : ''}</InputLabel>
                <Select
                    value={value}
                    label={label ? t(`label.${label}`) : ''}
                    onChange={handleSelectChange}
                    sx={{
                        textTransform: 'capitalize',
                    }}
                >
                    {isAll && (
                        <MenuItem
                            value={ALL}
                            sx={{
                                textTransform: 'capitalize',
                            }}
                        >
                            {t('selects.all')}
                        </MenuItem>
                    )}
                    {selects.map((select) => (
                        <MenuItem
                            key={select.name as string}
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
        </Box>
    )
}
