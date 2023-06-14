import { theme } from '@/utils'
import {
    Box,
    BoxProps,
    Button,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    alpha,
} from '@mui/material'
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
            <Stack
                alignItems={'center'}
                padding={theme.spacing(0, 1)}
                sx={{
                    display: {
                        md: 'flex',
                        xs: 'none',
                    },
                }}
            >
                <a href="#comments">
                    <Tooltip title={t('news.comment') as string}>
                        <IconButton
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
                    </Tooltip>
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

            {/* mobile */}
            <Button
                variant="contained"
                startIcon={<RiChat1Line />}
                sx={{
                    color: theme.palette.secondary.main,
                    fontSize: theme.typography.body2,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.075),
                    padding: theme.spacing(1, 2),
                    display: {
                        md: 'none',
                        xs: 'flex',
                    },
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    },
                }}
            >
                {t('button.comment')}
            </Button>
        </Box>
    )
}
