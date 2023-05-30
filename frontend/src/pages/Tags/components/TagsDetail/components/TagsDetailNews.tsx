import { EmptyList, NewsList } from '@/components/Common'
import { SearchFilter } from '@/components/Filters'
import { tagHeader } from '@/data'
import { INews, INewsFilters, INewsStatus } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack } from '@mui/material'
import { Dispatch, SetStateAction, useMemo } from 'react'

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
    const newNews = useMemo(() => {
        return news && news?.length ? news : []
    }, [news])

    const handleSetStatus = (value: INewsStatus) => {
        setFilters((prev) => ({ ...prev, status: value }))
    }

    const handleSearchFilters = (value: string | number) => {
        setFilters((prev) => ({ ...prev, search: !value ? '' : (value as string) }))
    }

    return (
        <Box {...rest}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack
                    direction={'row'}
                    gap={1}
                    sx={{
                        div: {
                            padding: theme.spacing(1, 2),
                            cursor: 'pointer',
                            marginBottom: 2,
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
                            {h.name}
                        </Box>
                    ))}
                </Stack>

                <SearchFilter
                    initValue={''}
                    onSearchChange={handleSearchFilters}
                    placeholder={'Search title...'}
                />
            </Stack>

            <Box>
                {!newNews.length && <EmptyList title="No news here" />}
                <NewsList newsList={newNews || []} />
            </Box>
        </Box>
    )
}
