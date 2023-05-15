import { theme } from '@/utils'
import { Box, BoxProps, Paper, Typography, Stack } from '@mui/material'

export interface IEmptyListProps extends BoxProps {
    title: string
}

export function EmptyList({ title, ...rest }: IEmptyListProps) {
    return (
        <Box component={Paper} padding={3} {...rest}>
            <Stack direction="row" justifyContent="center">
                <Typography
                    component="span"
                    sx={{
                        fontWeight: 700,
                        fontSize: theme.typography.h6,
                    }}
                >
                    {title}
                </Typography>
            </Stack>
        </Box>
    )
}
