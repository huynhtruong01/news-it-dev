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
import { IOptionItem } from '../../models'
import { ALL } from '../../consts'

export interface ISelectFilterProps extends BoxProps {
    label: string
    selects: IOptionItem[]
    initValue?: string | number
    onFilterChange: (value: string | number) => void
}

export function SelectFilter({
    selects,
    label,
    initValue = '',
    onFilterChange,
    ...rest
}: ISelectFilterProps) {
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
                        backgroundColor: '#fff',
                    }}
                >
                    <MenuItem
                        value={ALL}
                        sx={{
                            textTransform: 'capitalize',
                        }}
                    >
                        All
                    </MenuItem>
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
