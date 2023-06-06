import { SearchFilter } from '@/components/Filters'
import { IFiltersNewsSave } from '@/models'
import { Box, BoxProps, Stack } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface IReadingListFiltersProps extends BoxProps {
    setFilters: Dispatch<SetStateAction<IFiltersNewsSave>>
}

export function ReadingListFilters({ setFilters, ...rest }: IReadingListFiltersProps) {
    const { t } = useTranslation()
    const handleSearchChange = (value: string) => {
        setFilters((prev: IFiltersNewsSave) => ({ ...prev, search: value }))
    }

    return (
        <Box
            width={{
                md: 'auto',
                xs: '100%',
            }}
            {...rest}
        >
            <Stack direction={'row'} gap={2}>
                <SearchFilter
                    initValue={''}
                    onSearchChange={handleSearchChange}
                    placeholder={t('placeholder.search_title') as string}
                    sx={{
                        width: {
                            md: 250,
                            xs: '100%',
                        },
                    }}
                />
            </Stack>
        </Box>
    )
}
