import { IIcon } from '@/models'
import { theme } from '@/utils'
import { Button, ButtonProps, Typography, alpha } from '@mui/material'
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
                span: {
                    xs: theme.typography.body2,
                },
                backgroundColor: alpha(theme.palette.secondary.main, 0.075),
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
                        md: 'none',
                    },
                }}
            >
                {text.split(' ')[0]}
            </Typography>
            <Typography
                component="span"
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                }}
            >
                {text}
            </Typography>
        </Button>
    )
}
