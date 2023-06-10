import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Stack, StackProps } from '@mui/material'
import { red } from '@mui/material/colors'

export type IModalIconDeleteProps = StackProps

export function ModalIconDelete({ ...rest }: IModalIconDeleteProps) {
    return (
        <Stack direction={'row'} justifyContent={'center'} marginBottom={2} {...rest}>
            <Box
                sx={{
                    display: 'inline-flex',
                    padding: 1,
                    borderRadius: '50%',
                    backgroundColor: red[50],
                    color: red[500],
                }}
            >
                <DeleteIcon fontSize="large" />
            </Box>
        </Stack>
    )
}
