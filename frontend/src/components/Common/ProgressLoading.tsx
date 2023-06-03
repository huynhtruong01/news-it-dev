import { CircularProgress, Stack } from '@mui/material'

export function ProgressLoading() {
    return (
        <Stack direction={'row'} justifyContent={'center'}>
            <CircularProgress />
        </Stack>
    )
}
