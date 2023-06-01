import { IFiltersNewsSave, IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack, Typography, alpha } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface IReadingListTagsProps extends BoxProps {
    hashTags: IHashTag[]
    setFilters: Dispatch<SetStateAction<IFiltersNewsSave>>
}

export function ReadingListTags({
    hashTags,
    setFilters,
    ...rest
}: IReadingListTagsProps) {
    const { t } = useTranslation()
    const [activeTag, setActiveTag] = useState<string>('')

    const handleFilters = (tag: string) => {
        // SET TAG AND FILTERS TAGS, NEWS BY TAG
        if (!tag) {
            setActiveTag('')
            setFilters((prev: IFiltersNewsSave) => {
                const newFilters = { ...prev }
                delete newFilters.tag
                return newFilters
            })
            return
        }
        setActiveTag(tag)
        setFilters((prev: IFiltersNewsSave) => ({ ...prev, tag }))
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
                    <Typography component="span">{t('common.all_tags')}</Typography>
                </Box>
                {hashTags.map((tag) => (
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
