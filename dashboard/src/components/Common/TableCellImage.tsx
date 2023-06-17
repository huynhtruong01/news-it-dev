import { TableCell, TableCellProps } from '@mui/material'
import { EMPTY_IMG } from '../../consts'
import { SyntheticEvent } from 'react'

export type ITableCellImageProps = {
    src: string
    alt?: string
    width?: number
    height?: number
} & TableCellProps

export function TableCellImage({
    src,
    alt = '',
    width = 50,
    height = 50,
    ...rest
}: ITableCellImageProps) {
    const handleImageError = (e: SyntheticEvent<HTMLImageElement, any>) => {
        e.currentTarget.src = EMPTY_IMG
    }

    return (
        <TableCell
            sx={{
                display: 'flex',
                justifyContent: 'center',

                img: {
                    width,
                    height,
                    margin: 'auto',
                    borderRadius: 0.5,
                },
            }}
            {...rest}
        >
            <img src={src} alt={alt} onError={handleImageError} />
        </TableCell>
    )
}
