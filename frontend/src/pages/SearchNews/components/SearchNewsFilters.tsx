import { tagHeader } from '@/data'
import { NewsFilters, Order } from '@/enums'
import { IFilters, INewsStatus } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack, alpha } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

export interface ISearchNewsFiltersProps extends BoxProps {
    status: INewsStatus
    setStatus: Dispatch<SetStateAction<INewsStatus>>
    setFilters: Dispatch<SetStateAction<IFilters>>
}

export function SearchNewsFilters({
    status,
    setStatus,
    setFilters,
}: ISearchNewsFiltersProps) {
    const { t } = useTranslation()

    const handleFiltersSearchNewsChange = (value: INewsStatus) => {
        if (value === NewsFilters.LATEST) {
            setFilters((prev) => {
                const newFilters = { ...prev }
                delete newFilters.numLikes

                return { ...newFilters, createdAt: Order.DESC }
            })
        } else {
            setFilters((prev) => {
                const newFilters = { ...prev }
                delete newFilters.createdAt

                return { ...newFilters, numLikes: Order.DESC }
            })
        }

        setStatus(value)
    }

    return (
        <Box>
            <Stack
                component="ul"
                gap={1}
                sx={{
                    li: {
                        padding: theme.spacing(1.1, 1),
                        cursor: 'pointer',
                        borderRadius: theme.spacing(0.75),

                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.dark, 0.1),
                            color: theme.palette.primary.dark,
                        },
                    },
                }}
            >
                {tagHeader.map((f) => (
                    <Box
                        key={f.value}
                        component="li"
                        sx={{
                            backgroundColor:
                                status === f.value
                                    ? alpha(theme.palette.primary.dark, 0.1)
                                    : 'transparent',
                            color:
                                status === f.value
                                    ? theme.palette.primary.dark
                                    : theme.palette.secondary.main,
                            fontWeight: status === f.value ? 700 : 400,
                        }}
                        onClick={() =>
                            handleFiltersSearchNewsChange(f.value as INewsStatus)
                        }
                    >
                        {t(f.name as string)}
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
