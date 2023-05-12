import { IIcon } from '@/models'
import { Button, ButtonProps } from '@mui/material'

export type IButtonIconFormProps = {
    text?: string
    icon: IIcon
    onButtonClick: (() => Promise<void>) | (() => void)
} & ButtonProps

export function ButtonIconForm({
    text = '',
    icon,
    onButtonClick,
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
            startIcon={<Icon />}
            onClick={handleButtonClick}
            {...rest}
        >
            {text}
        </Button>
    )
}
