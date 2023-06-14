import { connect } from 'react-redux'
import { Widget } from '../../../components'
import { AppState } from '../../../store'
import { IComment } from '../../../models'
import { Box, Stack, Avatar, Typography, alpha } from '@mui/material'
import { theme } from '../../../utils'

export interface IDashboardCommentRecentProps {
    pCommentsDashboard: IComment[]
}

function DashboardCommentRecent({ pCommentsDashboard }: IDashboardCommentRecentProps) {
    return (
        <Widget title={'Recent Comments'}>
            <Stack gap={3}>
                {pCommentsDashboard.map((comment) => (
                    <Box key={comment.id}>
                        <Stack direction={'row'} gap={1}>
                            <Avatar
                                src={comment.user?.avatar}
                                alt={comment.user?.username}
                                sx={{
                                    borderRadius: theme.spacing(1),
                                }}
                            />
                            <Stack
                                sx={{
                                    span: {
                                        fontSize: theme.typography.body2,
                                        color: alpha(theme.palette.text.primary, 0.7),
                                    },
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        fontWeight: `600 !important`,
                                        color: `${theme.palette.primary.main} !important`,
                                        marginBottom: 0.2,
                                    }}
                                >
                                    {comment.user?.username}
                                </Typography>
                                <Typography
                                    component="span"
                                    dangerouslySetInnerHTML={{ __html: comment.comment }}
                                />
                            </Stack>
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Widget>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        pCommentsDashboard: state.comment.commentsDashboard,
    }
}

export default connect(mapStateToProps, null)(DashboardCommentRecent)
