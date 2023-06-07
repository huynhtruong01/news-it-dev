import { Stack, StackProps } from '@mui/material'
import { ReactNode } from 'react'

export interface ITitleContainerPageProps extends StackProps {
    children: ReactNode
}

export function TitleContainerPage({ children, ...rest }: ITitleContainerPageProps) {
    return (
        <Stack
            direction={{
                md: 'row',
                xs: 'column',
            }}
            justifyContent={{
                md: 'space-between',
                xs: 'center',
            }}
            alignItems={{
                md: 'center',
                xs: 'flex-start',
            }}
            gap={2}
            width={'100%'}
            marginBottom={{
                md: 2,
                xs: 0,
            }}
            {...rest}
        >
            {children}
        </Stack>
    )
}
