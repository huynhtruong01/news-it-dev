import { articleHeader } from '@/data'
import { Order } from '@/enums'
import { NewsFilters } from '@/enums/news'
import { IFilters } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export interface IArticleHeaderProps extends BoxProps {
    setFilters: Dispatch<SetStateAction<IFilters>>
}

export function ArticleHeader({ setFilters, ...rest }: IArticleHeaderProps) {
    const handleNewsFilters = (valFilter: string) => {
        if (valFilter === NewsFilters.LATEST) {
            setFilters((prev: IFilters) => ({ ...prev, createdAt: Order.ASC }))
            return
        }

        setFilters((prev: IFilters) => ({ ...prev, numLikes: Order.ASC }))
    }

    return (
        <Box component="header" {...rest}>
            <Stack gap={1} flexDirection={'row'} alignItems={'center'}>
                {articleHeader.map((item) => (
                    <Box
                        key={item.value}
                        component="li"
                        sx={{
                            backgroundColor: 'transparent',
                            padding: theme.spacing(1, 1.25),
                            color: theme.palette.secondary.main,
                            fontSize: '18px',
                            cursor: 'pointer',
                            borderRadius: theme.spacing(1),

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
