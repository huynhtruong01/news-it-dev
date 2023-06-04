import { NewsList } from '@/components/Common'
import { SearchFilter, SelectFilter } from '@/components/Filters'
import { tagHeader } from '@/data'
import { NewsFilters } from '@/enums'
import { INews, INewsFilters, INewsStatus } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack } from '@mui/material'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export interface ITagsDetailNewsProps extends BoxProps {
    news: INews[]
    filters: INewsFilters
    setFilters: Dispatch<SetStateAction<INewsFilters>>
}

export function TagsDetailNews({
    news,
    filters,
    setFilters,
    ...rest
}: ITagsDetailNewsProps) {
    const { t } = useTranslation()
    const newNews = useMemo(() => {
        return news && news?.length ? news : []
    }, [news])

    const handleSetStatus = (value: INewsStatus | string | number) => {
        if (typeof value !== 'string' || typeof value !== 'number') {
            setFilters((prev) => ({ ...prev, status: value as INewsStatus }))
        }
    }

    const handleSearchFilters = (value: string | number) => {
        setFilters((prev) => ({ ...prev, search: !value ? '' : (value as string) }))
    }

    return (
        <Box {...rest}>
            <Stack
                direction={{
                    md: 'row',
                    xs: 'column',
                }}
                justifyContent={{
                    md: 'space-between',
                    xs: 'center',
                }}
                gap={1}
            >
                <Stack
                    direction={'row'}
                    gap={1}
                    sx={{
                        display: {
                            md: 'flex',
                            xs: 'none',
                        },
                        order: {
                            md: 1,
                            xs: 2,
                        },
                        div: {
                            padding: theme.spacing(1, 2),
                            cursor: 'pointer',
                            fontSize: '18px',
                            borderRadius: theme.spacing(0.75),
                            '&:hover': {
                                backgroundColor: theme.palette.primary.contrastText,
                            },
                        },
                    }}
                >
                    {tagHeader.map((h) => (
                        <Box
                            key={h.value}
                            sx={{
                                fontWeight: h.value === filters.status ? 700 : 400,
                                color:
                                    h.value === filters.status
                                        ? theme.palette.primary.main
                                        : theme.palette.secondary.main,
                                backgroundColor:
                                    h.value === filters.status
                                        ? theme.palette.primary.contrastText
                                        : 'transparent',
                            }}
                            onClick={() => handleSetStatus(h.value as INewsStatus)}
                        >
                            {t(h.name as string)}
                        </Box>
                    ))}
                </Stack>

                <Box
                    sx={{
                        display: {
                            md: 'none',
                            xs: 'block',
                        },
                    }}
                >
                    <SelectFilter
                        selects={tagHeader}
                        initValue={NewsFilters.LATEST}
                        isAll={false}
                        label=""
                        onFilterChange={handleSetStatus}
                        width={'100%'}
                    />
                </Box>

                <SearchFilter
                    initValue={''}
                    onSearchChange={handleSearchFilters}
                    placeholder={t('placeholder.search_title') as string}
                    sx={{
                        order: {
                            md: 2,
                            xs: 1,
                        },
                    }}
                />
            </Stack>

            <Box marginTop={2}>
                <NewsList newsList={newNews || []} />
            </Box>
        </Box>
    )
}
