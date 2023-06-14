import { CircularProgress, Stack, StackProps } from '@mui/material'

export type IProgressLoading = StackProps

export function ProgressLoading({ ...rest }: IProgressLoading) {
    return (
        <Stack direction={'row'} justifyContent={'center'} {...rest}>
            <CircularProgress />
        </Stack>
    )
}
