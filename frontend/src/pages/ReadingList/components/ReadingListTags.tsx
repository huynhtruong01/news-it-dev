import { tagList } from '@/data'
import { IFilters } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack, Typography, alpha } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'

export interface IReadingListTagsProps extends BoxProps {
    hashTagIds: number[]
    setFilters: Dispatch<SetStateAction<IFilters>>
}

export function ReadingListTags({ hashTagIds, ...rest }: IReadingListTagsProps) {
    const [activeTag, setActiveTag] = useState<string>('')

    // TODO: FETCH TAGS HERE

    const handleFilters = (tag: string) => {
        // TODO: SET TAG AND FILTERS TAGS, NEWS BY TAG
        setActiveTag(tag)
    }

    return (
        <Box {...rest}>
            <Stack
                gap={0.5}
                component="ul"
                sx={{
                    li: {
                        padding: theme.spacing(1),
                        borderRadius: theme.spacing(0.75),
                        cursor: 'pointer',

                        '&:hover': {
                            color: theme.palette.primary.dark,
                        },
                    },
                }}
            >
                <Box
                    component="li"
                    sx={{
                        backgroundColor:
                            activeTag === ''
                                ? theme.palette.primary.contrastText
                                : 'transparent',
                        span: {
                            fontWeight: activeTag === '' ? 700 : 400,
                        },
                        '&:hover': {
                            backgroundColor:
                                activeTag === ''
                                    ? theme.palette.primary.contrastText
                                    : alpha(theme.palette.primary.dark, 0.1),
                        },
                    }}
                    onClick={() => handleFilters('')}
                >
                    <Typography component="span">All tags</Typography>
                </Box>
                {tagList.map((tag) => (
                    <Box
                        key={tag.id}
                        component="li"
                        sx={{
                            backgroundColor:
                                activeTag === tag.name
                                    ? theme.palette.primary.contrastText
                                    : 'transparent',
                            span: {
                                fontWeight: activeTag === tag.name ? 600 : 400,
                            },
                            '&:hover': {
                                backgroundColor:
                                    activeTag === tag.name
                                        ? theme.palette.primary.contrastText
                                        : alpha(theme.palette.primary.dark, 0.1),
                            },
                        }}
                        onClick={() => handleFilters(tag.name)}
                    >
                        <Typography component="span">#{tag.name}</Typography>
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
