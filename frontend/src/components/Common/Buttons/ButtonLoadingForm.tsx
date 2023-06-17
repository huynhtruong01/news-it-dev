import { theme } from '@/utils'
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton/LoadingButton'

export interface IButtonLoadingFormProps extends LoadingButtonProps {
    loading: boolean
    text: string
}

export function ButtonLoadingForm({ loading, text, ...rest }: IButtonLoadingFormProps) {
    return (
        <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            loadingPosition="start"
            variant="contained"
            disabled={loading}
            sx={{
                backgroundColor: theme.palette.primary.light,
                padding: 1.5,
                fontWeight: 500,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },
            }}
            {...rest}
        >
            {text}
        </LoadingButton>
    )
}
