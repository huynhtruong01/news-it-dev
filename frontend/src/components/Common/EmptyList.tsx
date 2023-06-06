import { theme } from '@/utils'
import { Box, BoxProps, Paper, Typography, Stack } from '@mui/material'

export interface IEmptyListProps extends BoxProps {
    title: string
    noPaper?: boolean
}

export function EmptyList({ title, noPaper = false, ...rest }: IEmptyListProps) {
    return (
        <Box component={noPaper ? 'div' : Paper} padding={3} {...rest}>
            <Stack direction="row" justifyContent="center">
                <Typography
                    component="span"
                    sx={{
                        fontSize: theme.typography.body1,
                        fontWeight: 700,
                    }}
                >
                    {title}
                </Typography>
            </Stack>
        </Box>
    )
}
