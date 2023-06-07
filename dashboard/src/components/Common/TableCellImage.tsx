import { TableCell } from '@mui/material'
import { EMPTY_IMG } from '../../consts'
import { SyntheticEvent } from 'react'

export type ITableCellImageProps = {
    src: string
    alt?: string
}

export function TableCellImage({ src, alt = '' }: ITableCellImageProps) {
    const handleImageError = (e: SyntheticEvent<HTMLImageElement, any>) => {
        e.currentTarget.src = EMPTY_IMG
    }

    return (
        <TableCell
            sx={{
                display: 'flex',
                justifyContent: 'center',

                img: {
                    width: 50,
                    height: 50,
                    margin: 'auto',
                    borderRadius: 0.5,
                },
            }}
        >
            <img src={src} alt={alt} onError={handleImageError} />
        </TableCell>
    )
}
