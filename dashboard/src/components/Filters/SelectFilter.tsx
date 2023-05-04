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
import { ISelectValue } from '../../models'

export interface ISelectFilterProps extends BoxProps {
    label: string
    selects: ISelectValue[]
    initValue?: string | number
}

export function SelectFilter({
    selects,
    label,
    initValue = '',
    ...rest
}: ISelectFilterProps) {
    const [value, setValue] = useState<string>(String(initValue))

    const handleSelectChange = (e: SelectChangeEvent) => {
        setValue(String(e.target.value))
    }

    return (
        <Box
            sx={{
                display: 'inline-block',
            }}
            minWidth={100}
            {...rest}
        >
            <FormControl size="small" fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    onChange={handleSelectChange}
                    sx={{
                        textTransform: 'capitalize',
                    }}
                >
                    {selects.map((select) => (
                        <MenuItem
                            key={select.name}
                            value={select.value}
                            sx={{
                                textTransform: 'capitalize',
                            }}
                        >
                            {select.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
