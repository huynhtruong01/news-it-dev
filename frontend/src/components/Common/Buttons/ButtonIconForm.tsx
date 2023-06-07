import { IIcon } from '@/models'
import { theme } from '@/utils'
import { Button, ButtonProps, Typography, alpha, useMediaQuery } from '@mui/material'
import { red } from '@mui/material/colors'

export type IButtonIconFormProps = {
    text?: string
    icon: IIcon
    isLiked?: boolean
    onButtonClick: (() => Promise<void>) | (() => void)
} & ButtonProps

export function ButtonIconForm({
    text = '',
    icon,
    onButtonClick,
    isLiked,
    ...rest
}: IButtonIconFormProps) {
    const isLargeScreen = useMediaQuery('(min-width:1024px)')
    const isBigScreen = useMediaQuery('(min-width:1280px)')

    const Icon = icon

    const handleButtonClick = async () => {
        try {
            await onButtonClick()
        } catch (error) {
            throw new Error(error as string)
        }
    }

    return (
        <Button
            variant={'contained'}
            fullWidth
            startIcon={
                <Icon
                    sx={{
                        color: isLiked ? red[700] : theme.palette.secondary.main,
                    }}
                />
            }
            onClick={handleButtonClick}
            sx={{
                backgroundColor: alpha(theme.palette.secondary.main, 0.075),
                span: {
                    xs: theme.typography.body2,
                },
                '.MuiButton-startIcon': {
                    margin:
                        isLargeScreen && !isBigScreen ? 0 : theme.spacing(0, 1, 0, -0.5),
                },
                '&:hover': {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                },
            }}
            {...rest}
        >
            <Typography
                component="span"
                sx={{
                    display: {
                        xs: 'block',
                        lg: 'none',
                    },
                }}
            >
                {text.split(' ').slice(0, 2).join(' ')}
            </Typography>
            <Typography
                component="span"
                sx={{
                    display: {
                        xs: 'none',
                        xl: 'block',
                    },
                }}
            >
                {text}
            </Typography>
        </Button>
    )
}
