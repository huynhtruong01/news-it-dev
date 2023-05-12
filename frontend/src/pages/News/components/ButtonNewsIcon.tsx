import { IIcon } from '@/models'
import { theme } from '@/utils'
import { Box, BoxProps, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

export type IButtonNewsIconProps = {
    text: string | number
    icon: IIcon
    children?: ReactNode
    onButtonClick: (() => Promise<void>) | (() => void)
} & BoxProps

export function ButtonNewsIcon({
    text,
    icon,
    children,
    onButtonClick,
    ...rest
}: IButtonNewsIconProps) {
    const Icon = icon

    return (
        <Box
            {...rest}
            position={'relative'}
            width={'100%'}
            onClick={onButtonClick}
            sx={{
                cursor: 'pointer',
            }}
        >
            <Stack alignItems={'center'} padding={theme.spacing(0, 1)}>
                <Box padding={1}>
                    <Icon />
                </Box>
                <Typography
                    component="span"
                    fontSize={'14px'}
                    fontWeight={400}
                    color={theme.palette.secondary.light}
                >
                    {text}
                </Typography>
            </Stack>
            {children}
        </Box>
    )
}
