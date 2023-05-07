import { Box, BoxProps } from '@mui/material'
import { theme } from '../../utils'

export type IBoxColorProps = {
    color: string
} & BoxProps

export function BoxColor({ color, ...rest }: IBoxColorProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: color,
                    borderRadius: theme.spacing(0.5),
                }}
                {...rest}
            ></Box>
        </Box>
    )
}
