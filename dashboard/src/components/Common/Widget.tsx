import { Box, BoxProps, Paper, Typography, Stack, IconButton } from '@mui/material'
import { ReactNode } from 'react'
import { theme } from '../../utils'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import { Link } from 'react-router-dom'

export interface IWidgetProps extends BoxProps {
    title: string
    isMore?: boolean
    link?: string
    children: ReactNode
}

export function Widget({ title, isMore, children, link, ...rest }: IWidgetProps) {
    return (
        <Box
            component={Paper}
            elevation={1}
            width={'100%'}
            borderRadius={theme.spacing(1)}
            padding={2}
            {...rest}
        >
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={1.5}
            >
                <Typography component="h6" variant="body1" fontWeight={600}>
                    {title}
                </Typography>
                {isMore && (
                    <IconButton
                        sx={{
                            padding: 0,
                            borderRadius: theme.spacing(1),
                            height: 24,
                            a: {
                                display: 'inline-block',
                                padding: theme.spacing(0, 1),
                                height: '100%',
                            },
                        }}
                    >
                        <Link to={link as string}>
                            <MoreHorizOutlinedIcon />
                        </Link>
                    </IconButton>
                )}
            </Stack>
            <Box padding={theme.spacing(1, 0)}>{children}</Box>
        </Box>
    )
}
