import { Avatar, Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

export function Header() {
    return (
        <Box
            component="header"
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                borderBottom: `1px solid ${grey[200]}`,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    padding: '16px 48px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                fontWeight: 700,
                                fontSize: '14px',
                            }}
                        >
                            Huynh Truong
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                fontSize: '12px',
                            }}
                        >
                            Admin
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        <Avatar
                            alt="Admin"
                            src="https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
