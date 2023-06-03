import { IUser } from '@/models'
import { AppState } from '@/store'
import { theme } from '@/utils'
import { Box, Button, Stack } from '@mui/material'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export interface IHeaderRightNotLoggedProps {
    pUser: IUser | null
}

function HeaderRightNotLogged({ pUser }: IHeaderRightNotLoggedProps) {
    const { t } = useTranslation()

    return (
        <Box display={!pUser ? 'block' : 'none'}>
            <Stack direction={'row'} gap={1} alignItems={'center'}>
                <Button
                    variant="contained"
                    sx={{
                        a: {
                            color: theme.palette.secondary.main,
                        },
                        '&:hover': {
                            backgroundColor: '#3b49df1a',

                            '& a': {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}
                >
                    <Link to={'/login'}>{t('auth.login')}</Link>
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        display: {
                            md: 'inline-flex',
                            xs: 'none',
                        },
                        border: `2px solid ${theme.palette.primary.main}`,

                        a: {
                            color: theme.palette.primary.main,
                        },

                        '&:hover': {
                            backgroundColor: theme.palette.primary.main,
                            '& a': {
                                color: theme.palette.primary.contrastText,
                            },
                        },
                    }}
                >
                    <Link to={'/signup'}>{t('auth.create_account')}</Link>
                </Button>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pUser: state.user.user,
    }
}

export default connect(mapStateToProps, null)(HeaderRightNotLogged)
