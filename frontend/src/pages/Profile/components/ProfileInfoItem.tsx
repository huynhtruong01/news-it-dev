import { IIcon } from '@/models'
import { Box, BoxProps, Stack, Typography } from '@mui/material'

export interface IProfileInfoItemProps extends BoxProps {
    icon: IIcon
    text: string
}

export function ProfileInfoItem({ icon, text, ...rest }: IProfileInfoItemProps) {
    const Icon = icon

    return (
        <Box {...rest}>
            <Stack direction={'row'} gap={1}>
                <Box>
                    <Icon />
                </Box>
                <Box>
                    <Typography component="span">{text}</Typography>
                </Box>
            </Stack>
        </Box>
    )
}
