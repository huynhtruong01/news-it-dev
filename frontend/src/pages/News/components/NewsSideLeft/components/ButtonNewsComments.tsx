import { theme } from '@/utils'
import { Box, BoxProps, IconButton, Stack, Typography } from '@mui/material'
import { yellow } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'
import { RiChat1Line } from 'react-icons/ri'

export interface IButtonNewsCommentsProps extends BoxProps {
    totalComments: number
}

export function ButtonNewsComments({ totalComments, ...rest }: IButtonNewsCommentsProps) {
    const { t } = useTranslation()

    return (
        <Box {...rest}>
            <Stack alignItems={'center'} padding={theme.spacing(0, 1)}>
                <a href="#comments">
                    <IconButton
                        title={t('news.comment') as string}
                        sx={{
                            borderRadius: '50%',

                            svg: {
                                transition: '.2s ease-in-out',
                            },
                            '&:hover': {
                                svg: {
                                    color: yellow[700],
                                },
                            },
                            a: {
                                display: 'inline-block',
                            },
                        }}
                    >
                        <RiChat1Line />
                    </IconButton>
                </a>
                <Typography
                    component={'span'}
                    sx={{
                        fontSize: theme.typography.body2,
                        fontWeight: 500,
                        color: theme.palette.secondary.light,
                    }}
                >
                    {totalComments}
                </Typography>
            </Stack>
        </Box>
    )
}
