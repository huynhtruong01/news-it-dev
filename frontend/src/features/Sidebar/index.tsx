import { Box, BoxProps, Stack } from '@mui/material'
import { SidebarHeader, SidebarNav, SidebarTag } from '@/features/Sidebar/components'

export type ISidebarProps = BoxProps

export function Sidebar({ ...rest }: ISidebarProps) {
    return (
        <Box {...rest}>
            <Box component="aside">
                <Stack direction={'column'} spacing={2}>
                    <SidebarHeader />
                    <SidebarNav />
                    <SidebarTag />
                </Stack>
            </Box>
        </Box>
    )
}
