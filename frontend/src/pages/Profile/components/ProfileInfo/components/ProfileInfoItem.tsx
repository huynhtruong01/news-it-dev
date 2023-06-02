import { IIcon } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack, Typography, alpha } from '@mui/material'

export interface IProfileInfoItemProps extends BoxProps {
    icon: IIcon
    text: string
}

export function ProfileInfoItem({ icon, text, ...rest }: IProfileInfoItemProps) {
    const Icon = icon

    return (
        <Box {...rest}>
            <Stack
                direction={'row'}
                alignItems={'center'}
                gap={1.5}
                sx={{
                    span: {
                        color: alpha(theme.palette.secondary.dark, 0.9),
                    },
                    svg: {
                        fontSize: theme.typography.h5,
                        color: alpha(theme.palette.secondary.dark, 0.6),
                    },
                }}
            >
                <Icon />
                <Box>
                    <Typography component="span">{text}</Typography>
                </Box>
            </Stack>
        </Box>
    )
}
