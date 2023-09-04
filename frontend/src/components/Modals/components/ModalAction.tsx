import { theme } from '@/utils'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import { Button, Stack, StackProps, alpha } from '@mui/material'
import { red } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'

export interface IModalActionProps extends StackProps {
    onClose: () => void
    onDelete: (() => Promise<void>) | (() => void)
    loading?: boolean
    isCallApi?: boolean
    text?: string
    disabled?: boolean
}

export function ModalAction({
    onClose,
    onDelete,
    loading = false,
    isCallApi = false,
    text = 'button.delete',
    disabled = false,
    ...rest
}: IModalActionProps) {
    const { t } = useTranslation()

    return (
        <Stack
            direction="row"
            gap={1}
            justifyContent="center"
            sx={{
                button: {
                    padding: 1.5,
                    fontWeight: 500,
                },
            }}
            {...rest}
        >
            <Button
                variant="contained"
                sx={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    color: theme.palette.secondary.main,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    },
                }}
                onClick={onClose}
                disabled={loading}
            >
                {t('button.cancel')}
            </Button>

            {isCallApi ? (
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    disabled={loading}
                    sx={{
                        flex: 1,
                        backgroundColor: red[500],
                        color: theme.palette.primary.contrastText,
                        border: '1px solid transparent',
                        '&:hover': {
                            backgroundColor: red[700],
                        },
                    }}
                    onClick={onDelete}
                >
                    {t(text)}
                </LoadingButton>
            ) : (
                <Button
                    variant="contained"
                    sx={{
                        flex: 1,
                        backgroundColor: red[500],
                        color: theme.palette.primary.contrastText,
                        border: '1px solid transparent',
                        '&:hover': {
                            backgroundColor: red[700],
                        },
                    }}
                    disabled={disabled}
                    onClick={onDelete}
                >
                    {t(text)}
                </Button>
            )}
        </Stack>
    )
}
