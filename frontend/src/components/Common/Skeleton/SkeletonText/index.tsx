import { Skeleton, Stack } from '@mui/material'

export interface ISkeletonTextProps {
    quantities?: number
}

export function SkeletonText({ quantities = 3 }: ISkeletonTextProps) {
    return (
        <Stack gap={0.5}>
            {Array.from(new Array(quantities)).map((_, idx) => (
                <Skeleton key={idx} variant="text" height={28} />
            ))}
        </Stack>
    )
}
