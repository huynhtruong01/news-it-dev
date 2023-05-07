import { Avatar, Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { connect } from 'react-redux'
import { AppState } from '../../store'
import { IUser, IRole } from '../../models'

export interface IHeaderProps {
    pUserLogin: IUser | null
}

function Header({ pUserLogin }: IHeaderProps) {
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
                            {pUserLogin?.username || 'Username'}
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                fontSize: '12px',
                                span: {
                                    textTransform: 'capitalize',
                                },
                            }}
                        >
                            {pUserLogin?.roles?.length &&
                                pUserLogin.roles.map((role: IRole) => (
                                    <span key={role.id}>{role.name}</span>
                                ))}
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

const mapStateToProps = (state: AppState) => {
    return {
        pUserLogin: state.user.userLogin,
    }
}

export default connect(mapStateToProps, null)(Header)
