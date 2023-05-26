import { Box, BoxProps, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'

export type IProgressBarProps = BoxProps

export function ProgressBar({ ...rest }: IProgressBarProps) {
    const [progressVal, setProgressVal] = useState<number>(0)

    useEffect(() => {
        const handleSetValueProgress = () => {
            const totalScrollHeight = document.body.scrollHeight - window.innerHeight
            const percentProgress =
                Number((window.scrollY / totalScrollHeight).toFixed(2)) * 100
            setProgressVal(percentProgress)
        }

        window.addEventListener('scroll', handleSetValueProgress)

        return () => {
            window.removeEventListener('scroll', handleSetValueProgress)
        }
    }, [])
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 20,
            }}
            {...rest}
        >
            <LinearProgress
                variant="determinate"
                value={progressVal}
                sx={{
                    backgroundColor: 'transparent',
                }}
            />
        </Box>
    )
}
