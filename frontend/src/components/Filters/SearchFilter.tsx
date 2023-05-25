import { Box, BoxProps, FormControl, InputAdornment, TextField } from '@mui/material'
import { ChangeEvent, useState, useCallback } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import { debounceFunc, theme } from '@/utils'

export interface ISearchFilterProps extends BoxProps {
    initValue: string
    onSearchChange: (value: string) => void
    placeholder?: string
}

export function SearchFilter({
    initValue,
    onSearchChange,
    placeholder = '',
    ...rest
}: ISearchFilterProps) {
    const [value, setValue] = useState<string>(initValue)
    const [showClearIcon, setShowClearIcon] = useState<boolean>(!!initValue)

    const handleSearchChange = (value: string) => {
        onSearchChange(value)
    }

    const debounceSearch = useCallback(
        debounceFunc((value: string) => handleSearchChange(value), 800),
        []
    )

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setValue(value)
        setShowClearIcon(!!value)
        debounceSearch(value)
    }

    const handleClear = () => {
        setValue('')
        setShowClearIcon(false)
        onSearchChange('')
    }

    return (
        <Box {...rest}>
            <FormControl fullWidth>
                <TextField
                    size="small"
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                style={{
                                    display: showClearIcon ? 'flex' : 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={handleClear}
                            >
                                <ClearOutlinedIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        backgroundColor: theme.palette.primary.contrastText,
                    }}
                />
            </FormControl>
        </Box>
    )
}
