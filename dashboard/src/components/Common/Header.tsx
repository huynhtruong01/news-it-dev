import { Avatar, Box, Typography } from '@mui/material'
import { connect } from 'react-redux'
import { IUser } from '../../models'
import { AppState } from '../../store'
import { theme } from '../../utils'
import { WIDTH_NAV } from '../../consts'

export interface IHeaderProps {
    pUserLogin: IUser | null
}

function Header({ pUserLogin }: IHeaderProps) {
    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',
                top: 0,
                left: WIDTH_NAV,
                width: `calc(100% - ${WIDTH_NAV}px)`,
                backgroundColor: theme.palette.primary.contrastText,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    padding: theme.spacing(1.5, 3),
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
                            {pUserLogin?.roles && (
                                <span>
                                    {pUserLogin?.roles?.map((r) => r.name).join(', ')}
                                </span>
                            )}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        <Avatar alt={pUserLogin?.username} src={pUserLogin?.avatar} />
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
