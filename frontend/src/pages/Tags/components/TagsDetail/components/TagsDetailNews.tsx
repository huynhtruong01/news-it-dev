import { EmptyList } from '@/components/Common'
import { tagHeader } from '@/data'
import { ArticleItem } from '@/features/ArticleContainer/components'
import { INews, INewsStatus } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Grid, Stack } from '@mui/material'
import { Dispatch, SetStateAction, useMemo } from 'react'

export interface ITagsDetailNewsProps extends BoxProps {
    news?: INews[]
    status: INewsStatus
    setStatus: Dispatch<SetStateAction<INewsStatus>>
}

export function TagsDetailNews({
    news,
    status,
    setStatus,
    ...rest
}: ITagsDetailNewsProps) {
    const newNews = useMemo(() => {
        return news?.length ? news : []
    }, [news])

    const handleSetStatus = (value: string) => {
        setStatus(value as INewsStatus)
    }

    return (
        <Box {...rest}>
            {newNews.length > 0 && (
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
                                fontWeight: h.value === status ? 700 : 400,
                                color:
                                    h.value === status
                                        ? theme.palette.primary.main
                                        : theme.palette.secondary.main,
                                backgroundColor:
                                    h.value === status
                                        ? theme.palette.primary.contrastText
                                        : 'transparent',
                            }}
                            onClick={() => handleSetStatus(h.value as INewsStatus)}
                        >
                            {h.name}
                        </Box>
                    ))}
                </Stack>
            )}

            <Box>
                {!newNews.length && <EmptyList title="No news here" />}
                <Grid container columns={12} spacing={2}>
                    {newNews.map((article) => (
                        <Grid item md={6} key={article.id}>
                            <ArticleItem article={article} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
