import { IIcon } from '@/models'
import { theme } from '@/utils'
import { Button, ButtonProps } from '@mui/material'
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
            {...rest}
        >
            {text}
        </Button>
    )
}
