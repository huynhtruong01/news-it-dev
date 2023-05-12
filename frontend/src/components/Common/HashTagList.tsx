import { IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack, alpha } from '@mui/material'
import { CSSProperties, useMemo } from 'react'
import { Link } from 'react-router-dom'

export interface IHashTagListProps extends BoxProps {
    tags: IHashTag[]
    fontText?: CSSProperties | string
}

export function HashTagList({
    tags,
    fontText = theme.typography.body2,
    ...rest
}: IHashTagListProps) {
    const newTags = useMemo(() => {
        return tags.length ? tags : []
    }, [])

    return (
        <Box component="nav" margin={'-4px'} marginBottom={theme.spacing(1.5)} {...rest}>
            <Stack component="ul" direction={'row'} gap={0.5}>
                {newTags.map((tag) => (
                    <Box
                        key={tag.id}
                        component="li"
                        sx={{
                            borderRadius: theme.spacing(0.5),
                            cursor: 'pointer',
                            transition: '0.2s ease-in-out',

                            '&:hover': {
                                backgroundColor: alpha(tag.color as string, 0.1),
                                boxShadow: `0 0 2px ${tag.color}`,
                            },

                            a: {
                                display: 'inline-block',
                                padding: theme.spacing(0.5, 1),
                                fontSize: fontText,

                                span: {
                                    color: tag.color,
                                },
                            },
                        }}
                    >
                        <Link to={'/'}>
                            <span>#</span>
                            {tag.name}
                        </Link>
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
