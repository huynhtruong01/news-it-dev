import { articleHeader } from '@/data'
import { Order } from '@/enums'
import { NewsFilters } from '@/enums/news'
import { IFilters, INewsStatus } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface IArticleHeaderProps extends BoxProps {
    filters: IFilters
    status: INewsStatus
    setStatus: Dispatch<SetStateAction<INewsStatus>>
    setFilters: Dispatch<SetStateAction<IFilters>>
}

export function ArticleHeader({
    filters,
    status,
    setStatus,
    setFilters,
    ...rest
}: IArticleHeaderProps) {
    const handleNewsFilters = (valFilter: string) => {
        const newFilters = { ...filters }
        if (valFilter === NewsFilters.LATEST) {
            delete newFilters.numLikes

            setStatus(NewsFilters.LATEST)
            setFilters({ ...newFilters, createdAt: Order.DESC })
            return
        }

        delete newFilters.createdAt
        setStatus(NewsFilters.TOP)
        setFilters({ ...newFilters, numLikes: Order.ASC })
    }

    return (
        <Box component="header" {...rest}>
            <Stack gap={1} flexDirection={'row'} alignItems={'center'}>
                {articleHeader.map((item) => (
                    <Box
                        key={item.value}
                        component="li"
                        sx={{
                            backgroundColor:
                                status === item.value
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',
                            padding: theme.spacing(1, 1.25),
                            color:
                                status === item.value
                                    ? theme.palette.primary.dark
                                    : theme.palette.secondary.main,
                            fontSize: '18px',
                            cursor: 'pointer',
                            borderRadius: theme.spacing(1),
                            fontWeight: status === item.value ? 600 : 400,

                            '&:hover': {
                                color: theme.palette.primary.main,
                                backgroundColor: theme.palette.primary.contrastText,
                            },
                        }}
                        onClick={() => handleNewsFilters(item.value as string)}
                    >
                        {item.name}
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
