import { Typography, TypographyProps } from '@mui/material'
import { ReactNode, Ref } from 'react'

export interface ITitlePageProps extends Omit<TypographyProps<'h1'>, 'component'> {
    children: ReactNode
    ref?: Ref<HTMLHeadingElement>
}

export function TitlePage({ children, ...rest }: ITitlePageProps) {
    return (
        <Typography {...rest} component="h1" variant="h4" fontWeight={700}>
            {children}
        </Typography>
    )
}
