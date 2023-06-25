import { Modal, Box, Paper, Stack, Avatar, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { IReport } from '../../models'

export interface IModalReportsProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    reporters: IReport[]
}

export function ModalReports({ open, setOpen, reporters }: IModalReportsProps) {
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Modal
            open={!!open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleClose}
            sx={{
                padding: 4,
            }}
        >
            <Box
                component={Paper}
                elevation={1}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        md: 600,
                        xs: '95%',
                    },
                    minHeight: 'calc(100vh - 4rem)',
                    padding: {
                        md: 3,
                        xs: 2,
                    },
                }}
            >
                {reporters.length === 0 && (
                    <Typography textAlign={'center'}>No reporters news</Typography>
                )}
                <Stack gap={1.5}>
                    {reporters.map((reporter) => (
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            key={reporter.id}
                        >
                            <Stack direction={'row'} alignItems={'center'} gap={0.5}>
                                <Avatar
                                    src={reporter?.reporter?.avatar}
                                    alt={reporter.reporter?.username}
                                />
                                <Typography>{reporter.reporter?.username}</Typography>
                            </Stack>
                            <Typography>{reporter.reason}</Typography>
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </Modal>
    )
}
