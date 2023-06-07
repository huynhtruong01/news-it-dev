import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button } from '@mui/material'
import { theme } from '../../utils'

export type IButtonFormProps<InitValues> = {
    initValues: InitValues
    disabled: boolean
    onClose: () => void
}

export function ButtonForm<InitValues>({
    initValues,
    disabled,
    onClose,
}: IButtonFormProps<InitValues>) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
            }}
        >
            <Button
                fullWidth
                variant="contained"
                onClick={onClose}
                sx={{
                    backgroundColor: theme.palette.grey[500],
                    '&:hover': {
                        backgroundColor: theme.palette.grey[700],
                    },
                }}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={initValues ? <EditIcon /> : <AddIcon />}
                disabled={disabled}
            >
                {initValues ? 'Update' : 'Add'}
            </Button>
        </Box>
    )
}
