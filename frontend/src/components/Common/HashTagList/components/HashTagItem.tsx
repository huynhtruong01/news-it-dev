import { COLOR_WHITE } from '@/consts'
import { IHashTag } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, alpha } from '@mui/material'
import { CSSProperties, useMemo } from 'react'
import { Link } from 'react-router-dom'

export interface IHashTagItemProps extends BoxProps {
    tag: IHashTag
    fontText?: CSSProperties | string
}

export function HashTagItem({ tag, fontText, ...rest }: IHashTagItemProps) {
    const color = useMemo(() => {
        return tag.color === COLOR_WHITE ? theme.palette.primary.dark : tag.color
    }, [tag])

    return (
        <Box
            component="li"
            sx={{
                borderRadius: theme.spacing(0.5),
                cursor: 'pointer',
                color: alpha(theme.palette.secondary.dark, 0.9),
                transition: '0.2s ease-in-out',

                '&:hover': {
                    backgroundColor: alpha(color as string, 0.1),
                    boxShadow: `0 0 2px ${color}`,
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
            {...rest}
        >
            <Link to={`/tags/${tag.name}`}>
                <span>#</span>
                {tag.name}
            </Link>
        </Box>
    )
}
