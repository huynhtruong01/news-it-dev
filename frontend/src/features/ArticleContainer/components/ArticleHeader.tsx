import { articleHeader } from '@/data'
import { theme } from '@/utils'
import { Box, BoxProps, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

export type IArticleHeaderProps = BoxProps

export function ArticleHeader({ ...rest }: IArticleHeaderProps) {
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
                    >
                        <Link to={item.link as string}>{item.name}</Link>
                    </Box>
                ))}
            </Stack>
        </Box>
    )
}
